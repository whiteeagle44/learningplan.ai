import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { PlanComponent } from './plan/plan.component';

const routes: Routes = [
  { path: '', component: CreatePlanComponent },
  { path: 'checkout', component: PlanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
