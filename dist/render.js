import { addTask, clearTasks, getTasks, getVisibleTasks, toggleTask, deleteTask, } from "./tasks.js";
import { capitalize, validateTaskName } from "./utils.js";
let taskGrid = null;
let header = null;
let footer = null;
let confirmDeleteId = null;
let confirmTimeout = null;
export function initRender(dom) {
    header = dom.header;
    taskGrid = dom.taskGrid;
    footer = dom.footer;
}
import { getSort, setSort, getPriorityFilter, setPriorityFilter, } from "./tasks.js";
export function renderHeader(updateUI) {
    if (!header)
        return;
    header.innerHTML = "";
    const title = document.createElement("h1");
    title.textContent = "用 Tasuku";
    const sortSelect = document.createElement("select");
    sortSelect.innerHTML = `
    <option value="created-newest">Newest</option>
    <option value="created-oldest">Oldest</option>
    <option value="priority">Priority</option>
    <option value="alphabetical">Alphabetical</option>
  `;
    sortSelect.value = getSort();
    sortSelect.addEventListener("change", () => {
        setSort(sortSelect.value);
        updateUI();
    });
    const prioritySelect = document.createElement("select");
    prioritySelect.innerHTML = `
    <option value="all">All</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
  `;
    prioritySelect.value = getPriorityFilter();
    prioritySelect.addEventListener("change", () => {
        setPriorityFilter(prioritySelect.value);
        updateUI();
    });
    header.append(title, sortSelect, prioritySelect);
}
export function createTaskCard(task, updateUI) {
    const card = document.createElement("article");
    card.classList.add("card", `${task.priority}-priority`);
    const title = document.createElement("h2");
    title.textContent = task.name;
    const date = document.createElement("p");
    date.textContent = task.createdAt.toLocaleDateString();
    const ribbon = document.createElement("div");
    ribbon.classList.add("ribbon");
    if (task.status === "completed") {
        ribbon.textContent = "completed";
        ribbon.classList.add("ribbon-complete", "completed");
    }
    else {
        ribbon.textContent = task.priority;
    }
    const completeButton = document.createElement("button");
    completeButton.textContent = task.status === "pending" ? "Complete" : "Undo";
    completeButton.addEventListener("click", () => {
        toggleTask(task.id);
        updateUI();
    });
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    if (confirmDeleteId === task.id) {
        deleteButton.textContent = "Are you sure?";
        deleteButton.classList.add("delete-confirm");
    }
    else {
        deleteButton.textContent = "Delete";
    }
    deleteButton.addEventListener("click", () => {
        if (confirmTimeout) {
            clearTimeout(confirmTimeout);
        }
        confirmTimeout = window.setTimeout(() => {
            confirmDeleteId = null;
            updateUI();
        }, 2000);
        updateUI();
        if (confirmDeleteId === task.id) {
            deleteTask(task.id);
            confirmDeleteId = null;
            updateUI();
            return;
        }
        confirmDeleteId = task.id;
        updateUI();
    });
    const controls = document.createElement("div");
    controls.classList.add("task-controls");
    controls.append(completeButton, deleteButton);
    card.append(title, date, ribbon, controls);
    return card;
}
export function renderTasks(updateUI) {
    if (!taskGrid)
        return;
    taskGrid.innerHTML = "";
    const tasks = getVisibleTasks();
    if (tasks.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No tasks yet.";
        taskGrid.append(empty);
        return;
    }
    for (const task of tasks) {
        taskGrid.append(createTaskCard(task, updateUI));
    }
}
export function renderStatusBar(container) {
    const completed = getTasks().filter((t) => t.status === "completed");
    const pending = getTasks().filter((t) => t.status === "pending");
    container.innerHTML = `
    <h2>Status</h2>
    <p>Completed: ${completed.length}</p>
    <p>Pending: ${pending.length}</p>
  `;
}
export function renderAddBar(updateUI) {
    if (!taskGrid)
        return;
    const addBar = document.createElement("div");
    addBar.classList.add("add-area");
    const addTitle = document.createElement("h2");
    addTitle.textContent = "Add tasks";
    const form = document.createElement("form");
    form.classList.add("add-form");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "New task";
    const charCounter = document.createElement("p");
    charCounter.classList.add("character-message");
    input.addEventListener("input", () => {
        const length = input.value.length;
        charCounter.textContent = `${length} /40`;
        charCounter.classList.toggle("too-few-characters", length > 0 && length < 3);
        charCounter.classList.toggle("warning", length >= 35);
        charCounter.classList.toggle("too-many-characters", length > 40);
    });
    const select = document.createElement("select");
    ["low", "medium", "high"].forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.textContent = capitalize(priority);
        select.append(option);
    });
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Add Task";
    form.append(addTitle, input, charCounter, errorMessage, select, addButton);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskName = input.value.trim();
        const error = validateTaskName(taskName);
        charCounter.textContent = `${input.value.length} /40`;
        if (error) {
            errorMessage.textContent = error;
            return;
        }
        addTask(taskName, select.value);
        input.value = "";
        errorMessage.textContent = "";
        updateUI();
    });
    taskGrid.before(form);
}
export function renderFooter(lastSaved, updateUI) {
    const footer = document.querySelector("#footer");
    if (!footer)
        return;
    const footerContainer = document.createElement("div");
    footerContainer.classList.add("footer", "content-grid");
    const lastSave = document.createElement("p");
    lastSave.textContent = lastSaved
        ? `Last save to local storage: ${lastSaved}`
        : "No saves yet";
    const clearAllButton = document.createElement("button");
    clearAllButton.classList.add("btn", "clear-all-button");
    clearAllButton.textContent = "DELETE ALL TASKS";
    clearAllButton.addEventListener("click", () => {
        // whatever your state function is
        clearTasks();
        updateUI();
    });
    footer.innerHTML = "";
    footerContainer.append(lastSave, clearAllButton);
    footer.append(footerContainer);
}
// export function renderFooter() {
//   if (!footer) return;
//   const lastSave = document.createElement("p");
//   const clearBtn = document.createElement("button");
//   clearBtn.textContent = "DELETE ALL TASKS";
//   clearBtn.addEventListener("click", () => {
//     import("./tasks.js").then(({ clearTasks }) => {
//       clearTasks();
//     });
//   });
//   lastSave.textContent = `Last save to local storage: ${localStorage.getItem("lastSaved")}`;
//   footer.innerHTML = "";
//   footer.append(lastSave, clearBtn);
// }
//# sourceMappingURL=render.js.map