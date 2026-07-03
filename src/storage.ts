import type { Settings, Task, Priority, Status, SortBy } from "./types";

export const saveToStorage = (tasks: Task[], settings: Settings): void => {
  const lastSave = new Date();
  const json = JSON.stringify(tasks);

  localStorage.setItem("tasks", json);
  localStorage.setItem("lastSaved", lastSave.toLocaleString());
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const loadFromStorage = (): {
  tasks: Task[];
  settings: Settings;
} => {
  let tasks: Task[] = [];

  let settings: Settings = {
    sort: "created-newest",
    priorityFilter: "all",
    statusFilter: "all",
  };

  const taskJson = localStorage.getItem("tasks");

  if (taskJson) {
    const parsed = JSON.parse(taskJson);

    tasks = parsed.map((task: Task) => ({
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
