import { Component } from '@angular/core';
import { OpenAIService } from '../services/openai.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent {
  createPlanForm = this.fb.group({
    skill: "",
    openAIApiKey: ""
  })

  constructor(private readonly openAIService: OpenAIService, private readonly fb: FormBuilder) { }

  generatePlan() {
    const skill = this.createPlanForm.value.skill;
    const openAIApiKey = this.createPlanForm.value.openAIApiKey;

    if (skill && openAIApiKey) {
      this.openAIService.getPlan(skill, openAIApiKey)
    } else {
      console.error(`skill or openAIApiKey is undefined`)
    }
  }
}
