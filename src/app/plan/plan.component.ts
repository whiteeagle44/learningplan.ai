import { Component } from '@angular/core';
import { Plan } from '../models/plan';
import { PlanService } from '../services/plan.service';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { PlanErrorResponse } from '../services/openai.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  planId: number | null = Number(this.route.snapshot.paramMap.get('planId'));
  plan: Plan | undefined = this.planService.getPlanById(this.planId)
  isLoading$: Observable<boolean> = this.planService.isLoading$

  constructor(private route: ActivatedRoute, private readonly planService: PlanService) { }
}
