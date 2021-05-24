document.getElementById("open").addEventListener("click", openMenu);
document.getElementById("close").addEventListener("click", closeMenu);
const container = document.querySelector(".container");
const circle = document.querySelector(".circle");

function openMenu() {
  container.classList.add("show-nav");
  circle.classList.add("color");
}
function closeMenu() {
  container.classList.remove("show-nav");
  circle.classList.remove("color");
}
