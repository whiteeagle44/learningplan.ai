import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { DayPlan } from '../models/dayPlan';
import { Plan } from '../models/plan';
import { OpenAIService, PlanErrorResponse } from './openai.service';

let planIdCounter = 1
let dayPlanIdCounter = 1

const createPlan = (name: string, dayPlans: DayPlan[]): Plan => {
  const id = planIdCounter++
  return { id, name, dayPlans }
}

export const createDayPlan = (isCompleted: boolean, goal: string, description: string, date: string, resources: string[]): DayPlan => {
  const id = dayPlanIdCounter++
  return { id, isCompleted, goal, description, date, resources }
}

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  refreshPlan$ = new Subject<{ skill: string, apiKey: string }>()
  plan$: Observable<Plan> = this.refreshPlan$.pipe(
    switchMap((params: { skill: string, apiKey: string }) => this.openAIService.getPlan(params.skill, params.apiKey)),
    map((plan) => createPlan(plan.name, plan.dayPlans)),
    tap(() => {
      this.isLoadingEmitter$.next(false)
      console.log("response obtained!")
    }),
    catchError((err: PlanErrorResponse) => {
      this.isLoadingEmitter$.next(false)
      this.planErrorEmitter$.next(err)
      console.log("error thrown!")
      return throwError(() => err)
    })
  )
  planErrorEmitter$ = new BehaviorSubject<PlanErrorResponse | null>(null)
  planError$ = this.planErrorEmitter$.asObservable();

  isLoadingEmitter$ = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingEmitter$.asObservable()

  constructor(private readonly openAIService: OpenAIService) { }

  createPlan(skill: string, apiKey: string) {
    this.isLoadingEmitter$.next(true)
    this.refreshPlan$.next({ skill, apiKey })
  }

}
