const header = document.querySelector<HTMLElement>("#header");
const taskGrid = document.querySelector<HTMLDivElement>("#task-grid");
const footer = document.querySelector<HTMLDivElement>("#footer");

// const title = document.querySelector<HTMLHeadingElement>("#title");

type Priority = "low" | "medium" | "high";
type Status = "pending" | "completed";

type Task = {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
  createdAt: Date;
  description?: string;
  notes?: string;
};

let tasks: Task[] = [
  {
    id: 1,
    name: "Lära oss TS",
    status: "pending",
    priority: "low",
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "Träna",
    status: "pending",
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Handla",
    status: "pending",
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Tvätta",
    status: "completed",
    priority: "low",
    createdAt: new Date(),
  },
  //   { id: 5, name: "Lära oss TS", status: "pending", priority: "low" },
  //   { id: 6, name: "Träna", status: "completed", priority: "high" },
  //   { id: 7, name: "Handla", status: "pending", priority: "medium" },
  //   { id: 8, name: "Tvätta", status: "completed", priority: "low" },
  //   { id: 9, name: "Lära oss TS", status: "pending", priority: "low" },
  //   { id: 10, name: "Träna", status: "completed", priority: "high" },
  //   { id: 11, name: "Handla", status: "pending", priority: "medium" },
  //   { id: 12, name: "Tvätta", status: "completed", priority: "low" },
];

let nextId = tasks.length + 1;

const getStatusTasks = (status: Status): Task[] => {
  return tasks.filter((tasks) => tasks.status === status);
};
const getPriorityTasks = (priority: Priority): Task[] => {
  return tasks.filter((tasks) => tasks.priority === priority);
};

const procentTracker = (num1: number, num2: number) => {
  if (num1 && num2) {
    return ((num1 / num2) * 100).toFixed(2);
  }

  if (!num1 || !num2) {
    return 0;
  }
};

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const saveTasks = () => {
  const lastSave = new Date();
  const json = JSON.stringify(tasks);
  localStorage.setItem("tasks", json);
  localStorage.setItem("lastSaved", lastSave.toDateString());
};

const loadTasks = () => {
  const json = localStorage.getItem("tasks");

  if (json === null) {
    return;
  }

  const parsed = JSON.parse(json);
  tasks = parsed.map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
  }));

  nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
};

const clearTasks = () => {
  tasks = [];
  saveTasks();
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
  saveTasks();
};

const toggleTask = (taskId: number): void => {
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.status = task.status === "pending" ? "completed" : "pending";
  saveTasks();
};

const deleteTask = (taskId: number): void => {
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
  saveTasks();
};

function createHeader(): void {
  if (header) {
    header.innerHTML = "";
  }
  const title = document.createElement("h1");
  title.textContent = "用 Tasuku";

  header?.append(title);
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

  console.log(errorMessage);

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

const statusBar = document.createElement("div");
statusBar.classList.add("status-area");

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

function validateTaskName(name: string): string {
  if (name === "") {
    return "Task name is required.";
  }

  if (name.length < 3) {
    return "Task name needs to be larger than 3 characters.";
  }

  if (name.length > 40) {
    return "Task can't be longer than 40 characters";
  }

  return "";
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

  for (const task of tasks) {
    taskGrid?.append(createTaskCard(task));
  }
}

const createFooter = () => {
  const footerContainer = document.createElement("div");
  footerContainer.classList.add("footer", "content-grid");

  footer?.append(footerContainer);

  const clearAllButton = document.createElement("button");
  clearAllButton.classList.add("btn", "clear-all-button");
  clearAllButton.textContent = " DELETE ALL TASKS";
  clearAllButton.addEventListener("click", () => {
    clearTasks();
    updateUI();
  });

  const lastSave = document.createElement("p");

  lastSave.textContent = `Last save to local storage: ${localStorage.getItem("lastSaved")}
`;

  footerContainer?.append(lastSave, clearAllButton);
};

function updateUI(): void {
  renderStatusBar();
  renderTasks();
}

loadTasks();
createHeader();
createAddBar();
createFooter();
renderStatusBar();
renderTasks();
