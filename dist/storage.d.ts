import type { Settings, Task } from "./types";
export declare const saveToStorage: (tasks: Task[], settings: Settings) => void;
export declare const loadFromStorage: () => {
    tasks: Task[];
    settings: Settings;
};
//# sourceMappingURL=storage.d.ts.map