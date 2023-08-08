import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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

export interface PlanErrorResponse {
  error: {
    error: {
      code: string,
      message: string,
      type: string
    }
  },
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  constructor(private readonly http: HttpClient) { }

  getPlan(skill: string, apiKey: string) {
    let currentDate = new Date()
    const messages = [{
      "role": "system",
      "content": `You will be provided with a skill that the user wants to learn. Take the role of an expert on this skill. Give a detailed learning plan for this skill for each day starting at ${currentDate.toDateString()}. Use the Pareto principle to select the most important curriculum content. For each day give at least one link to a specific resource that the user should learn from.`
    },
    {
      "role": "user", "content": `${skill}`
    }]
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
    console.log("requesting response for ", skill)
    const response = this.http.post<APIResponse>(`${environment.apiUrl}`,
      {
        "model": "gpt-3.5-turbo",
        "messages": messages,
        "functions": functionFormat
      }, { headers })
    return response.pipe(
      map(response => response.choices[0].message),
      map(message => {
        let functionArgs: { name: string, dayPlans: DayPlan[] } = JSON.parse(message.function_call.arguments)
        return functionArgs
      })
    )

  }
}
