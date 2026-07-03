import { loadFromStorage } from "./storage.js";
import { setState } from "./tasks.js";
import {
  initRender,
  renderHeader,
  renderTasks,
  renderFooter,
  renderAddBar,
  renderStatusBar,
} from "./render.js";

const header = document.querySelector("#header") as HTMLHeadElement;
const taskGrid = document.querySelector("#task-grid") as HTMLDivElement;
const footer = document.querySelector("#footer") as HTMLElement;

initRender({
  header,
  taskGrid,
  footer,
});

const statusBar = document.createElement("div") as HTMLElement;
statusBar.classList.add("status-area");
taskGrid.after(statusBar);

const footerContainer = document.createElement("div");
footerContainer.classList.add("footer", "content-grid");

const clearAllButton = document.createElement("button");
clearAllButton.classList.add("btn", "clear-all-button");
clearAllButton.textContent = " DELETE ALL TASKS";

function updateUI(): void {
  const lastSaved = localStorage.getItem("lastSaved");

  renderHeader(updateUI);
  renderStatusBar(statusBar);
  renderTasks(updateUI);
  renderFooter(lastSaved, updateUI);
}

setState(loadFromStorage());

renderAddBar(updateUI);
updateUI();
