import { Injectable } from '@angular/core';
import { Plan } from '../models/plan';
import { DayPlan } from '../models/dayPlan';

let planIdCounter = 1
let dayPlanIdCounter = 1

const createPlan = (name: string, dayPlans: DayPlan[]): Plan => {
  const id = planIdCounter++
  return { id, name, dayPlans }
}

const createDayPlan = (isCompleted: boolean, goal: string, description: string, date: Date, resources: URL[]): DayPlan => {
  const id = dayPlanIdCounter++
  return { id, isCompleted, goal, description, date, resources }
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plan: Plan | undefined

  constructor() { }

  create(name: string, dayPlans: DayPlan[]) {
    this.plan = createPlan(name, dayPlans)
    console.log("Created plan", this.plan)
  }
}
