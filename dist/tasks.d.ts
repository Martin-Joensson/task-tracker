import type { Task, SortBy, Priority, Status } from "./types";
export declare const getTasks: () => Task[];
export declare const getSettings: () => Settings;
export declare const getSort: () => SortBy;
export declare const getPriorityFilter: () => Priority | "all";
export declare const getStatusFilter: () => Status | "all";
export declare const setState: (loaded: {
    tasks: Task[];
    settings: Settings;
}) => void;
export declare const addTask: (taskName: string, priority?: Priority) => void;
export declare const toggleTask: (taskId: number) => void;
export declare const deleteTask: (taskId: number) => void;
export declare const clearTasks: () => void;
export declare const setSort: (value: SortBy) => void;
export declare const setPriorityFilter: (value: Priority | "all") => void;
export declare const setStatusFilter: (value: Status | "all") => void;
export declare function getVisibleTasks(): Task[];
//# sourceMappingURL=tasks.d.ts.map