let tasks = [];
let currentSort = "created-newest";
let currentPriorityFilter = "all";
let currentStatusFilter = "all";
const computeNextId = () => {
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
};
let nextId = computeNextId();
export const getTasks = () => {
    return [...tasks];
};
export const getSettings = () => {
    return {
        sort: currentSort,
        priorityFilter: currentPriorityFilter,
        statusFilter: currentStatusFilter,
    };
};
export const getSort = () => currentSort;
export const getPriorityFilter = () => currentPriorityFilter;
export const getStatusFilter = () => currentStatusFilter;
export const setState = (loaded) => {
    tasks = loaded.tasks;
    currentSort = loaded.settings.sort;
    currentPriorityFilter = loaded.settings.priorityFilter;
    currentStatusFilter = loaded.settings.statusFilter;
    nextId = computeNextId();
};
export const addTask = (taskName, priority = "low") => {
    tasks.push({
        id: nextId++,
        name: taskName,
        status: "pending",
        priority,
        createdAt: new Date(),
    });
};
export const toggleTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task)
        return;
    task.status = task.status === "pending" ? "completed" : "pending";
};
export const deleteTask = (taskId) => {
    const index = tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};
export const clearTasks = () => {
    tasks = [];
    nextId = 1;
};
export const setSort = (value) => {
    currentSort = value;
};
export const setPriorityFilter = (value) => {
    currentPriorityFilter = value;
};
export const setStatusFilter = (value) => {
    currentStatusFilter = value;
};
export function getVisibleTasks() {
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
//# sourceMappingURL=tasks.js.map