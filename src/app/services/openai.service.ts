import { Injectable } from '@angular/core';
import { PlanService } from './plan.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { DayPlan } from '../models/dayPlan';

interface APIResponse {
  choices: [
    {
      finish_reason: string
      message: {
        function_call: {
          name: string,
          arguments: string
        }
      }
    }
  ],
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  constructor(private readonly planService: PlanService, private readonly http: HttpClient) { }

  getPlan(skill: string, apiKey: string) {
    const messages = [{ "role": "user", "content": `give me a learning plan for learning ${skill}` }]
    const functionFormat = [
      {
        "name": "create",
        "description": "Get the learning plan for each day",
        "parameters": {
          "type": "object",
          "properties": {
            "name": { "type": "string", "description": "Optimistic, encouraging and creative name for the learning plan e.g. From zero to machine learning hero!" },
            "dayPlans": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "goal": {
                    "type": "string",
                    "description": "Detailed learning goals for this particular day"
                  },
                  "description": {
                    "type": "string",
                    "description": "Detailed description of the learning plan for this particular day"
                  },
                  "date": {
                    "type": "string",
                    "description": "Date object for when this particular day occurs e.g. 11 October 2022"
                  },
                  "resources": {
                    "type": "array",
                    "description": "List of urls to learning resources for this particular day e.g. https://www.coursera.org/specializations/machine-learning-introduction",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "required": ["name", "dayPlans"]
        },
      }
    ]
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    })
    const response = this.http.post<APIResponse>(`${environment.apiUrl}`,
      {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "functions": functionFormat
      }, { headers })
    response.subscribe({
      next: (response: APIResponse) => {
        const responseMessage = response.choices[0].message;

        if (responseMessage.function_call) {
          let functionArgs: { name: string, dayPlans: DayPlan[] } = JSON.parse(responseMessage.function_call.arguments)
          this.planService.create(functionArgs.name, functionArgs.dayPlans)
        }
      }
    });

  }
}
