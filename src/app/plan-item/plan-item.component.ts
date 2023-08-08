import { Component, Input } from '@angular/core';
import { DayPlan } from '../models/dayPlan';
import { PlanService, createDayPlan } from '../services/plan.service';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent {
  @Input("item") item: DayPlan | null = null
  // staticItem: DayPlan | null = createDayPlan(false, "learn xyz", "learn x today", "day 1", ["example.com"])
}
