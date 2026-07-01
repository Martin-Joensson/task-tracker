export const saveToStorage = (tasks, settings) => {
    const lastSave = new Date();
    const json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
    localStorage.setItem("lastSaved", lastSave.toLocaleString());
    localStorage.setItem("settings", JSON.stringify(settings));
};
export const loadFromStorage = () => {
    let tasks = [];
    let settings = {
        sort: "created-newest",
        priorityFilter: "all",
        statusFilter: "all",
    };
    const taskJson = localStorage.getItem("tasks");
    if (taskJson) {
        const parsed = JSON.parse(taskJson);
        tasks = parsed.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
        }));
    }
    const settingsJson = localStorage.getItem("settings");
    if (settingsJson) {
        settings = JSON.parse(settingsJson);
    }
    return {
        tasks,
        settings,
    };
};
//   const taskJson = localStorage.getItem("tasks");
//   if (taskJson) {
//     const parsed = JSON.parse(taskJson);
//     tasks = parsed.map((task: Task) => ({
//       ...task,
//       createdAt: new Date(task.createdAt),
//     }));
//     nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
//   }
//   const settingsJson = localStorage.getItem("settings");
//   if (settingsJson) {
//     const settings: Settings = JSON.parse(settingsJson);
//     currentSort = settings.sort;
//     currentPriorityFilter = settings.priorityFilter;
//     currentStatusFilter = settings.statusFilter;
//   }
//   return { tasks, settings };
//# sourceMappingURL=storage.js.map