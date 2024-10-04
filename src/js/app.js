import loadController from "./controllers/mainController.js";

document.addEventListener("DOMContentLoaded", () => loadController());
window.addEventListener("change", () => loadController());
