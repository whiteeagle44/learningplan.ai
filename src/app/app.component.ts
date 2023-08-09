import { Component } from '@angular/core';
import { PlanService } from './services/plan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learning-plan';
  plans = this.planService.plans

  constructor(private readonly planService: PlanService) { }
}
