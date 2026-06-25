const header = document.querySelector("#header");
const app = document.querySelector("#task-grid");
const title = document.querySelector("#title");
title.textContent = "Mina Tasks";
const tasks = [
    { id: 1, name: "Lära oss TS", status: "pending", priority: "low" },
    { id: 2, name: "Träna", status: "completed", priority: "high" },
    { id: 3, name: "Handla", status: "pending", priority: "medium" },
    { id: 4, name: "Tvätta", status: "completed", priority: "low" },
];
let nextId = tasks.length + 1;
console.log(tasks);
const getStatusTasks = (status) => {
    return tasks.filter((tasks) => tasks.status === status);
};
const getPriorityTasks = (priority) => {
    return tasks.filter((tasks) => tasks.priority === priority);
};
const procentTracker = (num1, num2) => {
    return ((num1 / num2) * 100).toFixed(2);
};
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const addTask = (taskName, priority = "low") => {
    tasks.push({ id: nextId++, name: taskName, status: "pending", priority });
};
const toggleTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task)
        return;
    task.status = task.status === "pending" ? "completed" : "pending";
};
const deleteTask = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};
function renderHeader() {
    if (header) {
        header.innerHTML = "";
    }
    const title = document.createElement("h1");
    title.textContent = "用 Tasuku";
    header?.append(title);
}
const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.placeholder = "New task";
const select = document.createElement("select");
const priorities = ["low", "medium", "high"];
for (const priority of priorities) {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = capitalize(priority);
    select.append(option);
}
const addButton = document.createElement("button");
addButton.type = "submit";
addButton.textContent = "Add Task";
form.append(input, select, addButton);
// Put the form above the task grid
app?.before(form);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskName = input.value.trim();
    if (!taskName)
        return;
    addTask(taskName, select.value);
    input.value = "";
    updateUI();
});
const statusBar = document.createElement("div");
statusBar.classList.add("status-area");
function renderStatusBar() {
    const completedTasks = getStatusTasks("completed");
    const pendingTasks = getStatusTasks("pending");
    const lowPriorityTasks = getPriorityTasks("low");
    const mediumPriorityTasks = getPriorityTasks("medium");
    const highPriorityTasks = getPriorityTasks("high");
    statusBar.innerHTML = `<h2 class=>Status</h2>
  <div class="status-bar">
    <p>Total tasks: ${tasks.length} <p>
    <p>Completed: ${completedTasks.length} <p>
    <p>Pending: ${pendingTasks.length} <p>
    <p> Low Priority: ${lowPriorityTasks.length} </p>
    <p> Medium Priority: ${mediumPriorityTasks.length} </p>
    <p> High Priority: ${highPriorityTasks.length} </p>
    <p> Procent complete: ${procentTracker(completedTasks.length, tasks.length)}%</p>
    </div>
    `;
    app?.before(statusBar);
}
function updateUI() {
    renderStatusBar();
    renderTasks();
}
function renderTasks() {
    if (app) {
        app.innerHTML = "";
    }
    for (const task of tasks) {
        const card = document.createElement("article");
        card.classList.add("card");
        card.classList.add(`${task.priority}-priority`);
        const title = document.createElement("h2");
        title.textContent = task.name;
        const status = document.createElement("p");
        status.textContent = `Status: ${capitalize(task.status)}`;
        const priority = document.createElement("p");
        priority.textContent = `Priority: ${capitalize(task.priority)}`;
        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        if (task.status === "pending") {
            completeButton.textContent = "Complete";
        }
        if (task.status === "completed") {
            completeButton.textContent = "Undo";
            completeButton.classList.add("button-completed");
        }
        completeButton.addEventListener("click", () => {
            toggleTask(task.id);
            updateUI();
        });
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
            updateUI();
        });
        const controls = document.createElement("div");
        controls.classList.add("task-controls");
        controls.append(completeButton, deleteButton);
        card.append(title, status, priority, controls);
        app?.prepend(card);
        console.log(tasks);
    }
}
renderHeader();
renderStatusBar();
renderTasks();
export {};
//# sourceMappingURL=dom.js.map