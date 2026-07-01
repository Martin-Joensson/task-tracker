import { saveToStorage } from "./storage.js";
import type { Task, SortBy, Priority, Status } from "./types";

let tasks: Task[] = [];

let currentSort: SortBy = "created-newest";
let currentPriorityFilter: Priority | "all" = "all";
let currentStatusFilter: Status | "all" = "all";

const computeNextId = (): number => {
  return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
};

let nextId = computeNextId();

export const getTasks = (): Task[] => {
  return [...tasks];
};

export const getSettings = (): Settings => {
  return {
    sort: currentSort,
    priorityFilter: currentPriorityFilter,
    statusFilter: currentStatusFilter,
  };
};

export const getSort = (): SortBy => currentSort;
export const getPriorityFilter = (): Priority | "all" => currentPriorityFilter;
export const getStatusFilter = (): Status | "all" => currentStatusFilter;

export const setState = (loaded: { tasks: Task[]; settings: Settings }) => {
  tasks = loaded.tasks;

  currentSort = loaded.settings.sort;
  currentPriorityFilter = loaded.settings.priorityFilter;
  currentStatusFilter = loaded.settings.statusFilter;

  nextId = computeNextId();
};

export const addTask = (taskName: string, priority: Priority = "low"): void => {
  tasks.push({
    id: nextId++,
    name: taskName,
    status: "pending",
    priority,
    createdAt: new Date(),
  });

  saveToStorage(tasks, getSettings());
};

export const toggleTask = (taskId: number): void => {
  const task = tasks.find((task) => task.id === taskId);

  if (!task) return;

  task.status = task.status === "pending" ? "completed" : "pending";

  saveToStorage(tasks, getSettings());
};

export const deleteTask = (taskId: number): void => {
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
  }
  saveToStorage(tasks, getSettings());
};

export const clearTasks = (): void => {
  tasks = [];

  nextId = 1;
  saveToStorage(tasks, getSettings());
};

export const setSort = (value: SortBy): void => {
  currentSort = value;
};

export const setPriorityFilter = (value: Priority | "all"): void => {
  currentPriorityFilter = value;
};

export const setStatusFilter = (value: Status | "all"): void => {
  currentStatusFilter = value;
};

export function getVisibleTasks(): Task[] {
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
