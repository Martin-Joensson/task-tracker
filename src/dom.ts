import type { Task, Priority, Status, SortBy, Settings } from "./types.js";
import { capitalize, procentTracker, validateTaskName } from "./utils.js";
import { saveToStorage, loadFromStorage } from "./storage.js";

const header = document.querySelector<HTMLElement>("#header");
const taskGrid = document.querySelector<HTMLDivElement>("#task-grid");
const footer = document.querySelector<HTMLDivElement>("#footer");

const statusBar = document.createElement("div");
statusBar.classList.add("status-area");

const footerContainer = document.createElement("div");
footerContainer.classList.add("footer", "content-grid");

const clearAllButton = document.createElement("button");
clearAllButton.classList.add("btn", "clear-all-button");
clearAllButton.textContent = " DELETE ALL TASKS";

const lastSave = document.createElement("p");

let tasks: Task[] = [];

const loaded = loadFromStorage();
tasks = loaded.tasks;

let currentPriorityFilter = loaded.settings.priorityFilter;
let currentStatusFilter = loaded.settings.statusFilter;
let currentSort = loaded.settings.sort;

function getSettings(): Settings {
  return {
    sort: currentSort,
    priorityFilter: currentPriorityFilter,
    statusFilter: currentStatusFilter,
  };
}

let nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

function getVisibleTasks(): Task[] {
  let visible = [...tasks];

  // Filtering
  if (currentPriorityFilter !== "all") {
    visible = visible.filter((task) => task.priority === currentPriorityFilter);
  }

  if (currentStatusFilter !== "all") {
    visible = visible.filter((task) => task.status === currentStatusFilter);
  }

  // Sorting
  switch (currentSort) {
    case "created-newest":
      visible.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      break;

    case "created-oldest":
      visible.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      break;

    case "alphabetical":
      visible.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "priority":
      const order = {
        high: 3,
        medium: 2,
        low: 1,
      };
      visible.sort((a, b) => order[b.priority] - order[a.priority]);
      break;
  }
  return visible;
}

const getStatusTasks = (status: Status): Task[] => {
  return tasks.filter((tasks) => tasks.status === status);
};

const getPriorityTasks = (priority: Priority): Task[] => {
  return tasks.filter((tasks) => tasks.priority === priority);
};

const clearTasks = (): void => {
  tasks = [];

  saveToStorage(tasks, getSettings());
  nextId = 1;
};

const addTask = (taskName: string, priority: Priority = "low"): void => {
  tasks.push({
    id: nextId++,
    name: taskName,
    status: "pending",
    priority,
    createdAt: new Date(),
  });
  saveToStorage(tasks, getSettings());
};

const toggleTask = (taskId: number): void => {
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.status = task.status === "pending" ? "completed" : "pending";
  saveToStorage(tasks, getSettings());
};

const deleteTask = (taskId: number): void => {
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
  saveToStorage(tasks, getSettings());
};

function createSortSelection(): HTMLElement {
  const sortSelect = document.createElement("select");

  sortSelect.innerHTML = `

    <option value="created-newest">Newest</option>
    <option value="created-oldest">Oldest</option>
    <option value="priority">Priority</option>
    <option value="alphabetical">Alphabetical</option>
`;

  sortSelect.value = currentSort;

  sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value as SortBy;
    saveToStorage(tasks, getSettings());
    updateUI();
  });

  return sortSelect;
}

function createPrioritySelection(): HTMLElement {
  const prioritySelect = document.createElement("select");

  prioritySelect.innerHTML = `

    <option value="all">All</option>
    <option value="high">High</option>
    <option value="medium">Medium</option>
    <option value="low">Low</option>
`;

  prioritySelect.value = currentPriorityFilter;

  prioritySelect.addEventListener("change", () => {
    currentPriorityFilter = prioritySelect.value as Priority | "all";
    saveToStorage(tasks, getSettings());
    updateUI();
  });

  return prioritySelect;
}

function createHeader(): void {
  if (header) {
    header.innerHTML = "";
  }
  const title = document.createElement("h1");
  title.textContent = "用 Tasuku";

  header?.append(title, createSortSelection(), createPrioritySelection());
}

function createAddBar(): void {
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
    input.required;
    input.minLength = 3;
    input.maxLength = 45;
    charCounter.textContent = `${length} /40`;

    charCounter.classList.toggle(
      "too-few-characters",
      length > 0 && length < 3,
    );
    charCounter.classList.toggle("warning", length >= 35);

    charCounter.classList.toggle("too-many-characters", length > 40);
  });

  const select = document.createElement("select");

  const priorities: Priority[] = ["low", "medium", "high"];

  for (const priority of priorities) {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = capitalize(priority);
    select.append(option);
  }

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add Task";

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = "";

  form.append(addTitle, input, charCounter, errorMessage, select, addButton);

  // Put the form above the task grid
  taskGrid?.before(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = input.value.trim();
    const error = validateTaskName(taskName);
    charCounter.textContent = `${input.value.length} /40`;

    if (error !== "") {
      errorMessage.textContent = error;
      return;
    }

    addTask(taskName, select.value as Priority);

    input.value = "";

    updateUI();
  });
}

function renderStatusBar(): void {
  const completedTasks = getStatusTasks("completed");
  const pendingTasks = getStatusTasks("pending");

  const lowPriorityTasks = getPriorityTasks("low");
  const mediumPriorityTasks = getPriorityTasks("medium");
  const highPriorityTasks = getPriorityTasks("high");

  statusBar.innerHTML = `<h2 class=>Status</h2>
  <div class="status-bar">
    <p>Total tasks: ${tasks.length} </p>
    <p>Completed: ${completedTasks.length} </p>
    <p>Pending: ${pendingTasks.length} </p>
    <p> Low Priority: ${lowPriorityTasks.length} </p>
    <p> Medium Priority: ${mediumPriorityTasks.length} </p>
    <p> High Priority: ${highPriorityTasks.length} </p>
    <p> Procent complete: ${procentTracker(completedTasks.length, tasks.length)}%</p>
    </div>
    `;
  taskGrid?.before(statusBar);
}

function createTaskCard(task: Task): HTMLElement {
  const card = document.createElement("article");
  card.classList.add("card", `${task.priority}-priority`);

  const title = document.createElement("h2");
  title.textContent = task.name;

  const date = document.createElement("p");
  date.textContent = task.createdAt.toLocaleDateString();

  const ribbon = document.createElement("div");
  ribbon.classList.add("ribbon");
  if (task.status === "completed") {
    ribbon.textContent = task.status;
    ribbon.classList.add("ribbon-complete");
  }
  ribbon.classList.add("ribbon");
  if (task.status === "pending") {
    ribbon.textContent = task.priority;
  }

  const status = document.createElement("p");
  // status.textContent = `Status: ${capitalize(task.status)}`;
  status.classList.add(task.status);

  // const priority = document.createElement("p");
  // priority.textContent = `Priority: ${capitalize(task.priority)}`;

  const completeButton = document.createElement("button");
  completeButton.classList.add("btn", "complete-btn");

  completeButton.textContent = task.status === "pending" ? "Complete" : "Undo";

  completeButton.addEventListener("click", () => {
    toggleTask(task.id);
    updateUI();
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "delete-btn");
  deleteButton.textContent = `Delete`;

  deleteButton.addEventListener("click", () => {
    if (deleteButton.textContent === "Delete") {
      deleteButton.textContent = "Sure?";
      completeButton.textContent = "No!";
      console.log("Sure?");
      return;
    }

    if (deleteButton.textContent === "Sure?") {
      deleteButton.textContent = "Delete";

      deleteTask(task.id);
    }
    updateUI();
  });

  const controls = document.createElement("div");
  controls.classList.add("task-controls");
  controls.append(completeButton, deleteButton);

  card.append(title, date, ribbon, status, controls);

  //  app?.prepend(card);

  return card;
}

function renderTasks(): void {
  if (taskGrid) {
    taskGrid.innerHTML = "";
  }

  if (tasks.length === 0) {
    const noTasks = document.createElement("p");
    noTasks.textContent = "No tasks yet.";
    taskGrid?.append(noTasks);
  }

  for (const task of getVisibleTasks()) {
    taskGrid?.append(createTaskCard(task));
  }
}

function createFooter(): void {
  clearAllButton.addEventListener("click", () => {
    clearTasks();
    updateUI();
  });

  footerContainer.append(lastSave, clearAllButton);
  footer?.append(footerContainer);
  renderFooter();
}

function renderFooter(): void {
  lastSave.textContent = `Last save to local storage: ${localStorage.getItem("lastSaved")}
`;
}

function updateUI(): void {
  renderStatusBar();
  renderTasks();
  renderFooter();
}

loadFromStorage();
createHeader();
createAddBar();
createFooter();
updateUI();
