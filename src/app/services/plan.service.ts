import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, ignoreElements, map, of, switchMap, tap } from 'rxjs';
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
  refreshPlans$ = new Subject<{ skill: string, apiKey: string }>()
  planToAddErrors$: Observable<PlanErrorResponse> = this.refreshPlans$.pipe(
    switchMap((params: { skill: string, apiKey: string }) => this.openAIService.getPlan(params.skill, params.apiKey).pipe(
      map((plan) => createPlan(plan.name, plan.dayPlans)),
      tap((plan: Plan) => {
        console.log("adding plan")
        console.log(plan)
        this.addPlan(plan)
        this.isLoadingEmitter$.next(false)
        console.log("response obtained!")
      }),
      ignoreElements(),
      catchError((err: PlanErrorResponse) => {
        this.isLoadingEmitter$.next(false)
        this.planErrorEmitter$.next(err)
        console.log("error thrown!")
        return of(err)
        // return throwError(() => err)
      })

    )),
  )
  plans: Plan[] = []
  planErrorEmitter$ = new BehaviorSubject<PlanErrorResponse | null>(null)
  planError$ = this.planErrorEmitter$.asObservable();

  isLoadingEmitter$ = new BehaviorSubject<boolean>(false)
  isLoading$ = this.isLoadingEmitter$.asObservable()

  constructor(private readonly openAIService: OpenAIService) {
    // Load plans from local storage during service initialization
    const storedPlans = localStorage.getItem('plans');
    if (storedPlans) {
      this.plans = JSON.parse(storedPlans);
    }

    const storedPlanIdCounter = localStorage.getItem('planIdCounter');
    if (storedPlanIdCounter) {
      planIdCounter = parseInt(storedPlanIdCounter, 10);
    }
    const storedDayPlanIdCounter = localStorage.getItem('dayPlanIdCounter');
    if (storedDayPlanIdCounter) {
      dayPlanIdCounter = parseInt(storedDayPlanIdCounter, 10);
    }
  }

  private addPlan(plan: Plan) {
    this.plans.push(plan);
    this.updateLocalStorage();
  }

  // Update local storage with the current plans array
  private updateLocalStorage() {
    localStorage.setItem('plans', JSON.stringify(this.plans));
    localStorage.setItem('planIdCounter', planIdCounter.toString());
    localStorage.setItem('dayPlanIdCounter', dayPlanIdCounter.toString());
  }

  createPlan(skill: string, apiKey: string) {
    this.isLoadingEmitter$.next(true)
    this.refreshPlans$.next({ skill, apiKey })
  }

  getPlanById(id: number | null) {
    console.log("id: ", id)
    if (id === null) {
      throw new Error("id cannot be null")
    }
    return this.plans.find((plan: Plan) => plan.id === id)
  }

}
