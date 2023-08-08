import { Component } from '@angular/core';
import { Plan } from '../models/plan';
import { PlanService } from '../services/plan.service';
import { Observable, combineLatest, map } from 'rxjs';
import { PlanErrorResponse } from '../services/openai.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  plan$: Observable<Plan> = this.planService.plan$
  planError$: Observable<PlanErrorResponse | null> | null = this.planService.planError$
  isLoading$: Observable<boolean> = this.planService.isLoading$

  constructor(private readonly planService: PlanService) { }
}
