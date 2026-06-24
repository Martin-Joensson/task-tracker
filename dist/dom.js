const header = document.querySelector("#header");
const app = document.querySelector("#task-grid");
const title = document.querySelector("#title");
title.textContent = "Mina Tasks";
const tasks = [
    { name: "Lära oss TS", status: "pending", priority: "low" },
    { name: "Träna", status: "completed", priority: "low" },
    { name: "Handla", status: "pending", priority: "medium" },
    { name: "Tvätta", status: "completed", priority: "low" },
    { name: "Plugga", status: "pending", priority: "high" },
    { name: "Testa", status: "pending", priority: "high" },
    { name: "Testa", status: "pending", priority: "high" },
];
const showHeader = (text) => {
    let output = [];
    let spaceOutput = [];
    let size = text.length * 2;
    let space = text.length / 2;
    if (text.length % 2 === 0) {
        for (let i = 0; i < size; i++) {
            output.push("=");
        }
    }
    else {
        for (let i = 0; i <= size; i++) {
            output.push("=");
        }
    }
    for (let i = 0; i < space; i++) {
        spaceOutput.push(" ");
    }
    console.log(`${output.join("")}
${spaceOutput.join("")}${text}
${output.join("")}`);
};
const showTasks = (tasks) => {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task) {
            console.log(`${i + 1}: ${task.name}  ${task.priority} ${task.status}`);
        }
    }
};
const completedTasks = () => {
    const completedTasks = [];
    tasks.map((item) => {
        if (item.status === "completed") {
            completedTasks.push(item);
        }
    });
    return completedTasks;
};
const pendingTasks = () => {
    const pendingTasks = [];
    tasks.map((item) => {
        if (item.status === "pending") {
            pendingTasks.push(item);
        }
    });
    return pendingTasks;
};
const procentTracker = (num1, num2) => {
    return (num1 / num2) * 100;
};
const addTask = (taskName, priority = "low") => {
    tasks.push({ name: taskName, status: "pending", priority });
    updateUI();
};
const completeTask = (taskName) => {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.name === taskName) {
            task.status = "completed";
        }
    }
};
const deleteTask = (taskName) => {
    const index = tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};
function renderHeader() {
    if (header) {
        header.innerHTML = "";
    }
    const title = document.createElement("h1");
    title.textContent = "Tasuku";
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
    option.textContent = priority;
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
    statusBar.innerHTML = `<h2 class=>Status</h2>
  <div class="status-bar">
    <p>Total tasks: ${tasks.length} <p>
    <p>Completed: ${completedTasks().length} <p>
    <p> High Priority: ${completedTasks().length} </p>
    </div>
    `;
    app?.before(statusBar);
}
function renderTasks() {
    if (app) {
        app.innerHTML = "";
    }
    for (const task of tasks) {
        const card = document.createElement("article");
        card.classList.add("card");
        if (task.priority === "high") {
            card.classList.add("high-priority");
        }
        if (task.priority === "low") {
            card.classList.add("low-priority");
        }
        const title = document.createElement("h2");
        title.textContent = task.name;
        const status = document.createElement("p");
        status.textContent = `Status: ${task.status}`;
        const priority = document.createElement("p");
        priority.textContent = `Priority: ${task.priority}`;
        const completeButton = document.createElement("button");
        completeButton.classList.add("btn");
        if (task.status === "pending") {
            completeButton.textContent = "Complete";
        }
        if (task.status === "completed") {
            completeButton.textContent = "Nice!";
            completeButton.classList.add("button-completed");
            completeButton.disabled = true;
        }
        completeButton.addEventListener("click", () => {
            completeTask(task.name);
            updateUI();
        });
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.name);
            updateUI();
        });
        const controls = document.createElement("div");
        controls.classList.add("task-controls");
        controls.append(completeButton, deleteButton);
        card.append(title, status, priority, controls);
        app?.append(card);
    }
}
function updateUI() {
    renderStatusBar();
    renderTasks();
}
renderHeader();
renderStatusBar();
renderTasks();
export {};
//# sourceMappingURL=dom.js.map