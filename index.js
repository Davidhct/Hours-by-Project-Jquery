document.getElementById("open").addEventListener("click", openMenu);
document.getElementById("close").addEventListener("click", closeMenu);
const container = document.querySelector(".container");

function openMenu() {
  container.classList.add("show-nav");
}
function closeMenu() {
  container.classList.remove("show-nav");
}
