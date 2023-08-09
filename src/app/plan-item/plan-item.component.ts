import { Component, Input } from '@angular/core';
import { DayPlan } from '../models/dayPlan';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent {
  @Input("item") item: DayPlan | null = null
}
