$(document).ready(function () {
  inputListener();
  addInputListener();
  resetListener();
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
  click: false,
};

const clockForm = (clock) => {
  clock = typeof clock === "number" ? `${clock}` : clock;
  clock = clock.includes(".") ? clock.split(".") : clock.split(":");
  return [Number(clock[0]), Number(clock[1])];
};
const clockFormat = (hour, minute) => {
  minute = Number(minute);
  return `${hour}:${minute <= 9 ? "0" + minute : minute}`;
};
function addInputListener() {
  $("#add-btn").click(function (e) {
    e.preventDefault();
    let tmp = globalVal.index;
    globalVal.index = tmp + 1;
    renderInput();
  });
}

function inputListener() {
  $("#calc-btn").click((e) => {
    e.preventDefault();
    reset();
    globalVal.click = !globalVal.click;
    getInput();
  });
}

function resetListener() {
  $("#reset-btn").click(function (e) {
    e.preventDefault();
    globalVal.index = 1;
    reset();
    $("#more-input").empty();
    $("#from-0").val("");
    $("#until-0").val("");
    $("#project-name-0").val("");
  });
}

function reset() {
  globalVal.start = "";
  globalVal.clockStack = [];
  globalVal.projectsStsck = [];
  globalVal.finalResult = [];
  $(".render-output").remove();
}
function getInput() {
  let from, until, project;
  for (let i = 0; i < globalVal.index; i++) {
    from = $(`#from-${i}`).val();
    until = $(`#until-${i}`).val();
    project = $(`#project-name-${i}`).val();
    if (from === "" || until === "" || project === "") {
      $(`#input-${i}`).remove();
      continue;
    }
    setInput(from, until, project);
    if (i === 0) {
      const hour = clockForm(from);
      globalVal.start = clockFormat(hour[0], hour[1]);
    }
  }
  filterTheProjects();
}

function setInput(from, until, project) {
  checkProjects(project);

  let hourFrom, minuteFrom, hourUntil, minuteUntil, newHour, newMinute;

  [hourFrom, minuteFrom] = clockForm(from);
  [hourUntil, minuteUntil] = clockForm(until);

  if (minuteFrom > minuteUntil) {
    newHour = hourUntil - hourFrom;
    newHour = newHour - 1;
    newMinute = minuteFrom - minuteUntil;
    newMinute = 60 - newMinute;
  } else if (minuteFrom <= minuteUntil) {
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
/////////////
function calculateHours(hour, minute) {
  let newMinute = 0;

  if (minute >= 60) {
    newMinute = minute / 60;
    hour = hour + Math.floor(newMinute);
    if (Math.floor(newMinute) > 1) {
      tmp2 = Math.floor(newMinute) * 60;
      minute = Math.abs(minute - tmp2);
    } else {
      minute = minute - 60;
    }
  }

  return [hour, minute];
}
/////////
function filterTheHours() {
  let currHour, currMinute;
  globalVal.finalResult.forEach((item) => {
    [item.hours, item.minutes] = calculateHours(item.hours, item.minutes);
  });
  console.log(globalVal.finalResult);
  console.log(globalVal.projectsStsck);

  renderTable();

  globalVal.finalResult.forEach((item) => {
    [currHour, currMinute] = clockForm(globalVal.start);

    currHour += item.hours;
    currMinute += item.minutes;

    [currHour, currMinute] = calculateHours(currHour, currMinute);
    renderOutput(currHour, currMinute, item.projectName);

    globalVal.start = clockFormat(currHour, currMinute);
  });
}

function renderInput() {
  const html = `<article class="input" id="input-${globalVal.index - 1}">
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
}

function renderTable() {
  const html = `
          <section class="render-output">
            <h1>Summary of hours</h1>
            <table>
              <tr>
                <th>hours</th>
                <th>projects</th>
              </tr>
            </table>
          </section>  
            `;
  $("#output").append(html);
}

function renderOutput(currHour, currMinute, projectName) {
  const tr = `<tr>
                  <td class="hours">${globalVal.start} - ${currHour}:${
    currMinute < 9 ? "0" + currMinute : currMinute
  }</td>
                  <td class="project">${projectName}</td>
          </tr>`;
  $("table").append(tr);
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
