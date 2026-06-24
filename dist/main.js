const app = document.querySelector("#task-grid");
const title = document.querySelector("#title");
title.textContent = "Mina Tasks";
const tasks = [
    { name: "Lära oss TS", status: "pending", priority: "low" },
    { name: "Träna", status: "completed", priority: "low" },
    { name: "Handla", status: "pending", priority: "medium" },
    { name: "Tvätta", status: "pending", priority: "low" },
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
};
const completeTask = (taskName) => {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.name === taskName) {
            task.status = "completed";
        }
    }
};
const showStatistics = () => {
    showHeader("Statistics");
    taskCounter();
    console.log(`Completed: ${completedTasks().length} out of ${tasks.length} - ${procentTracker(completedTasks().length, tasks.length).toFixed(2)}%`);
    console.log(`Pending: ${pendingTasks().length} out of ${tasks.length} - ${procentTracker(pendingTasks().length, tasks.length).toFixed(2)}%`);
};
const taskCounter = () => {
    console.log(`
    
Antal upggifter: ${tasks.length}st`);
};
showHeader("Tasks ");
showTasks(tasks);
taskCounter();
showHeader("Completed Tasks ");
showTasks(completedTasks());
showHeader("Pending Tasks ");
showTasks(pendingTasks());
addTask("Jogga", "medium");
addTask("Springa", "high");
completeTask("Handla");
showHeader("Updated Tasks ");
showTasks(tasks);
taskCounter();
showStatistics();
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
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn");
        deleteButton.textContent = "Delete";
        const controls = document.createElement("div");
        controls.classList.add("task-controls");
        controls.append(completeButton, deleteButton);
        card.append(title, status, priority, controls);
        app?.append(card);
    }
}
renderTasks();
export {};
//# sourceMappingURL=main.js.map