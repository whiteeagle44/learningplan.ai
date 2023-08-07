import { DayPlan } from "./dayPlan";

export interface Plan {
    id: number;
    name: string;
    dayPlans: DayPlan[];
}