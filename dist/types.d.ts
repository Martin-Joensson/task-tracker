export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "completed";
export type Task = {
    id: number;
    name: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    description?: string;
    notes?: string;
};
export type Settings = {
    sort: SortBy;
    priorityFilter: Priority | "all";
    statusFilter: Status | "all";
};
export type SortBy = "created-newest" | "created-oldest" | "priority" | "alphabetical";
//# sourceMappingURL=types.d.ts.map