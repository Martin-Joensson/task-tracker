const header = document.querySelector("#header");
const app = document.querySelector("#task-grid");
const tasks = [
    { id: 1, name: "Lära oss TS", status: "pending", priority: "low" },
    { id: 2, name: "Träna", status: "pending", priority: "high" },
    { id: 3, name: "Handla", status: "pending", priority: "medium" },
    { id: 4, name: "Tvätta", status: "completed", priority: "low" },
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
function createHeader() {
    if (header) {
        header.innerHTML = "";
    }
    const title = document.createElement("h1");
    title.textContent = "用 Tasuku";
    header?.append(title);
}
function createAddBar() {
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
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "";
    console.log(errorMessage);
    form.append(addTitle, input, charCounter, errorMessage, select, addButton);
    // Put the form above the task grid
    app?.before(form);
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskName = input.value.trim();
        const error = validateTaskName(taskName);
        charCounter.textContent = `${input.value.length} /40`;
        if (error !== "") {
            errorMessage.textContent = error;
            return;
        }
        addTask(taskName, select.value);
        input.value = "";
        updateUI();
    });
}
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
    <p>Total tasks: ${tasks.length} </p>
    <p>Completed: ${completedTasks.length} </p>
    <p>Pending: ${pendingTasks.length} </p>
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
function validateTaskName(name) {
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
function renderTasks() {
    if (app) {
        app.innerHTML = "";
    }
    for (const task of tasks) {
        const card = document.createElement("article");
        card.classList.add("card", `${task.priority}-priority`);
        const title = document.createElement("h2");
        title.textContent = task.name;
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
        if (task.status === "pending") {
            completeButton.textContent = "Complete";
        }
        if (task.status === "completed") {
            completeButton.textContent = "Undo";
        }
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
        card.append(title, ribbon, status, controls);
        app?.prepend(card);
    }
}
createHeader();
createAddBar();
renderStatusBar();
renderTasks();
export {};
//# sourceMappingURL=dom.js.map