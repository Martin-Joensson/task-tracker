import { loadFromStorage } from "./storage.js";
import { setState } from "./tasks.js";
import { initRender, renderHeader, renderTasks, renderFooter, renderAddBar, } from "./render.js";
const header = document.querySelector("#header");
const taskGrid = document.querySelector("#task-grid");
const footer = document.querySelector("#footer");
initRender({
    header,
    taskGrid,
    footer,
});
const statusBar = document.createElement("div");
statusBar.classList.add("status-area");
const footerContainer = document.createElement("div");
footerContainer.classList.add("footer", "content-grid");
const clearAllButton = document.createElement("button");
clearAllButton.classList.add("btn", "clear-all-button");
clearAllButton.textContent = " DELETE ALL TASKS";
const lastSave = document.createElement("p");
function updateUI() {
    const lastSaved = localStorage.getItem("lastSaved");
    renderHeader(updateUI);
    renderTasks(updateUI);
    renderFooter(lastSaved, updateUI);
}
setState(loadFromStorage());
renderAddBar(updateUI);
updateUI();
//# sourceMappingURL=app.js.map