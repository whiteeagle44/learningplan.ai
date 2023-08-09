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
  planId: number | null = 0; // Initialize with null
  plan: Plan | undefined = this.planService.getPlanById(this.planId)
  isLoading$: Observable<boolean> = this.planService.isLoading$

  constructor(private route: ActivatedRoute, private readonly planService: PlanService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const newPlanId = Number(paramMap.get('planId'));
      if (newPlanId !== this.planId && this.planId !== null) {
        this.planId = newPlanId;
        this.plan = this.planService.getPlanById(this.planId);
      }
    });
  }

}
