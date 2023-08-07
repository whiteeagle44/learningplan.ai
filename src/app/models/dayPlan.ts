export interface DayPlan {
    id: number;
    isCompleted: boolean;
    goal: string;
    description: string;
    date: Date;
    resources: URL[];
}