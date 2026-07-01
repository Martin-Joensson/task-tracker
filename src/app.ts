import { loadFromStorage } from "./storage.js";
import { setState } from "./tasks.js";
import {
  renderHeader,
  renderTasks,
  renderFooter,
  renderAddBar,
} from "./render.js";

const statusBar = document.createElement("div");
statusBar.classList.add("status-area");

const footerContainer = document.createElement("div");
footerContainer.classList.add("footer", "content-grid");

const clearAllButton = document.createElement("button");
clearAllButton.classList.add("btn", "clear-all-button");
clearAllButton.textContent = " DELETE ALL TASKS";

const lastSave = document.createElement("p");


function updateUI(): void {
  const lastSaved = localStorage.getItem("lastSaved");
  renderHeader(updateUI);
  renderTasks(updateUI);
  renderFooter(lastSaved, updateUI);
}

setState(loadFromStorage());
updateUI();
renderAddBar(updateUI, taskGrid);
