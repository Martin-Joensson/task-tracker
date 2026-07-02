import type { Task } from "./types.js";
export declare function initRender(dom: {
    header: HTMLElement | null;
    taskGrid: HTMLElement | null;
    footer: HTMLElement | null;
}): void;
export declare function renderHeader(updateUI: () => void): void;
export declare function createTaskCard(task: Task, updateUI: () => void): HTMLElement;
export declare function renderTasks(updateUI: () => void): void;
export declare function renderStatusBar(container: HTMLElement): void;
export declare function renderAddBar(updateUI: () => void): void;
export declare function renderFooter(lastSaved: string | null, updateUI: () => void): void;
//# sourceMappingURL=render.d.ts.map