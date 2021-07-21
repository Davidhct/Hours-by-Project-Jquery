$(document).ready(function () {
  inputListener();
  addInputListener();
});
$(document).keypress((e) => {
  if (e.which === 13) {
    e.preventDefault();
    $("#calc-btn").click();
  }
});

const globalVal = {
  index: 1,
  clockStack: [],
  projectsStsck: [],
  finalResult: [],
  start: "",
};

function inputListener() {
  $("#calc-btn").click((e) => {
    if (globalVal.start === "") {
      let from, until, project;
      e.preventDefault();
      for (let i = 0; i < globalVal.index; i++) {
        from = $(`#from-${i}`).val();
        until = $(`#until-${i}`).val();
        project = $(`#project-name-${i}`).val();
        if (from === "" || until === "" || project === "") {
          alert("You muat enter hours and project name!");

          break;
        }
        calculateHour(from, until, project);
        if (i === 0) {
          globalVal.start = from;
        }
      }
      filterTheProjects();
    } else {
      reset();
    }
  });
}
function reset() {
  globalVal.index = 1;
  globalVal.start = "";
  globalVal.clockStack = [];
  globalVal.projectsStsck = [];
  globalVal.finalResult = [];
  $("#output").empty();
}

function calculateHour(from, until, project) {
  checkProjects(project);

  let clockFrom,
    clockUntil,
    hourFrom,
    minuteFrom,
    hourUntil,
    minuteUntil,
    newHour,
    newMinute;

  // if (
  //   (!from.includes(".") && !from.split(":")) ||
  //   (!until.includes(".") && !until.split(":"))
  // )
  //   return;
  clockFrom = from.includes(".") ? from.split(".") : from.split(":");
  clockUntil = until.includes(".") ? until.split(".") : until.split(":");

  hourFrom = Number(clockFrom[0]);
  minuteFrom = Number(clockFrom[1]);
  hourUntil = Number(clockUntil[0]);
  minuteUntil = Number(clockUntil[1]);

  if (minuteFrom > minuteUntil) {
    newHour = hourUntil - hourFrom;
    newHour = newHour - 1;
    newMinute = minuteFrom - minuteUntil;
    newMinute = 60 - newMinute;
  } else if (minuteFrom < minuteUntil) {
    newHour = hourUntil - hourFrom;
    newMinute = minuteUntil - minuteFrom;
  }

  globalVal.clockStack.unshift({
    hours: newHour,
    minutes: newMinute,
    projectName: project,
  });

  console.log(globalVal.clockStack);
}

function addInputListener() {
  $("#add-btn").click(function (e) {
    e.preventDefault();
    let tmp = globalVal.index;
    globalVal.index = tmp + 1;
    const html = `<article class="input">
                    <input type="text" placeholder="From" id="from-${
                      globalVal.index - 1
                    }" />
                    <input type="text" placeholder="Until" id="until-${
                      globalVal.index - 1
                    }" />
                    <input type="text" placeholder="Project name" id="project-name-${
                      globalVal.index - 1
                    }" />
                  </article>`;

    $("#more-input").append(html);
  });
}

function filterTheProjects() {
  let sumHours = 0;
  let sumMinutes = 0;
  for (let i = 0; i < globalVal.projectsStsck.length; i++) {
    globalVal.clockStack.forEach((item) => {
      if (item.projectName === globalVal.projectsStsck[i]) {
        sumHours += item.hours;
        sumMinutes += item.minutes;
      }
    });
    globalVal.finalResult.push({
      hours: sumHours,
      minutes: sumMinutes,
      projectName: globalVal.projectsStsck[i],
    });
    sumHours = 0;
    sumMinutes = 0;
  }
  console.log(globalVal.finalResult);
  filterTheHours();
}

function filterTheHours() {
  let tmp1, tmp2;
  globalVal.finalResult.forEach((item) => {
    if (item.minutes >= 60) {
      tmp1 = item.minutes / 60;
      item.hours = item.hours + Math.floor(tmp1);
      if (Math.floor(tmp1) > 1) {
        tmp2 = Math.floor(tmp1) * 60;
        item.minutes = Math.abs(item.minutes - tmp2);
      } else {
        tmp = item.minutes - 60;
        item.minutes = tmp;
      }
    }
    tmp1 = 0;
    tmp2 = 0;
  });
  console.log(globalVal.finalResult);
  console.log(globalVal.projectsStsck);
  renderTableOutput();
  let curr, currHour, currMinute;
  globalVal.finalResult.forEach((item, i) => {
    curr = globalVal.start.includes(".")
      ? globalVal.start.split(".")
      : globalVal.start.split(":");
    currHour = Number(curr[0]);
    currMinute = Number(curr[1]);
    currHour += item.hours;
    currMinute += item.minutes;
    if (currMinute >= 60) {
      tmp1 = currMinute / 60;

      currHour = currHour + Math.floor(tmp1);
      if (Math.floor(tmp1) > 1) {
        tmp2 = Math.floor(tmp1) * 60;
        currMinute = Math.abs(currMinute - tmp2);
      } else {
        currMinute = currMinute - 60;
      }
    }

    $("table").append(`<tr>
            <td class="hours">${globalVal.start} - ${currHour}:${
      currMinute < 9 ? "0" + currMinute : currMinute
    }</td>
            <td class="project">${item.projectName}</td>
          </tr>`);
    globalVal.start = `${currHour}:${
      currMinute < 9 ? "0" + currMinute : currMinute
    }`;
  });
}

function renderTableOutput() {
  const html = `
            <h1>Summary of hours</h1>
            <table>
              <tr>
                <th>hours</th>
                <th>projects</th>
              </tr>
            </table>
            `;
  $("#output").append(html);
}

function checkProjects(project) {
  let count = 0;
  if (globalVal.projectsStsck.length === 0) {
    globalVal.projectsStsck.push(project);
  } else {
    globalVal.projectsStsck.forEach((pro) => {
      if (pro === project) {
        count++;
      }
    });
    if (count === 0) {
      globalVal.projectsStsck.push(project);
    }
  }
}
