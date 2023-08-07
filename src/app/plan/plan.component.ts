import { Component } from '@angular/core';
import { Plan } from '../models/plan';
import { PlanService } from '../services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  plan: Plan | undefined = this.planService.plan

  constructor(private readonly planService: PlanService) { }
}
