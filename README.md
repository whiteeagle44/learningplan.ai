# LearningPlan.ai

## About 
LearningPlan.ai is an innovative online platform designed to empower users in their learning journey. This platform leverages the capabilities of AI and human-friendly interactions to help users create personalized learning plans tailored to their interests and goals. By providing their desired skill and OpenAI API key, users can generate comprehensive learning plans that guide them on their path to mastery.

## Key Features and Functionality:

* Personalized Learning Plans: Users can input the skill or topic they wish to learn. LearningPlan.ai intelligently generates a detailed learning plan that includes suggested resources, study materials, milestones, and goals.

* Plan Saving: Users have the option to save their generated learning plans for future reference. This allows them to revisit and track their progress over time.

* Multiple Learning Plans: LearningPlan.ai supports multiple learning plans. Users can create, manage, and switch between different plans, making it easy to pursue various skills simultaneously.

* Secure API Integration: To enable AI-driven interactions, users are required to provide their ChatGPT API key. This ensures a secure and personalized learning experience.

## Technologies Used:
The LearningPlan.ai platform is built using `Angular`, a popular front-end framework. The use of Angular enables seamless user interactions and a dynamic user interface. The project heavily utilizes observables, a core concept in Angular, to manage asynchronous data flows and deliver real-time updates to users.

It utilizes the [OpenAI API](https://platform.openai.com/docs/api-reference/chat/create) as a datasource.

## User stories
* As an internet user with a desire to learn,
So I can embark on a structured learning journey,
I want to be able to input the skill or topic I want to learn.

* As a user interested in efficient learning,
So I can receive personalized guidance,
I would like the system to generate a comprehensive learning plan for my chosen skill.

* As a lifelong learner,
So I can keep track of my learning goals,
I want the ability to save the learning plan generated for me.

* As someone who learns multiple skills simultaneously,
So I can manage my learning pursuits effectively,
I would like the option to create and switch between multiple learning plans.

* As a security-conscious user,
So I can ensure the safety of my interactions,
I want the system to securely integrate with the OpenAI API using my API key.

* As a user who values an engaging user experience,
So I can easily navigate and interact with the platform,
I expect an intuitive and user-friendly interface for generating and managing learning plans.

## Domain model
```
Class: CreatePlanComponent
-------------------------------------
Attributes:
- createPlanForm: FormGroup
- planToAddErrors$: Observable<PlanErrorResponse>

Methods:
+ generatePlan()

Associations:
- planService: PlanService
- fb: FormBuilder

Class: PlanComponent
-------------------------------------
Attributes:
- planId: number | null
- plan: Plan | undefined
- isLoading$: Observable<boolean>

Associations:
- route: ActivatedRoute
- planService: PlanService

Class: PlanItemComponent
-------------------------------------
Attributes:
- item: DayPlan | null

Class: DayPlan
-------------------------------------
Attributes:
- id: number
- isCompleted: boolean
- goal: string
- description: string
- date: string
- resources: string[]

Class: Plan
-------------------------------------
Attributes:
- id: number
- name: string
- dayPlans: DayPlan[]

Class: OpenAIService
-------------------------------------
Methods:
+ getPlan(skill: string, apiKey: string)

Associations:
- http: HttpClient

Class: PlanService
-------------------------------------
Attributes:
- refreshPlans$: Subject<{ skill: string, apiKey: string }>
- plans: Plan[]
- planErrorEmitter$: BehaviorSubject<PlanErrorResponse | null>
- isLoadingEmitter$: BehaviorSubject<boolean>

Methods:
+ createPlan(skill: string, apiKey: string)
+ getPlanById(id: number | null)

Associations:
- openAIService: OpenAIService

Class: AppComponent
-------------------------------------
Attributes:
- title: string
- plans: Plan[]

Associations:
- planService: PlanService
```

## Target Audience:
LearningPlan.ai is designed for all internet users who have a desire to learn and improve their skills. Whether it's a student, a professional, or an enthusiast, anyone seeking to embark on a structured learning journey can benefit from this platform.

## Unique Selling Points:
* AI-Driven Learning Plans: The integration of OpenAI's capabilities empowers users to receive personalized learning recommendations, enhancing their learning effectiveness.
* User-Friendly Interface: LearningPlan.ai offers a user-friendly and intuitive interface that guides users through the process of generating, managing, and tracking their learning plans.

## Challenges:
During the development of LearningPlan.ai, challenges were overcome in integrating the OpenAI API effectively, ensuring secure handling of user data, and designing an intuitive user interface that caters to a diverse range of learning goals.

## Future Plans:
In the future, LearningPlan.ai aims to expand its offerings by storing users plans in the browser storage and further improving the application design.

## Personal Learning:
The development of LearningPlan.ai provided the opportunity to gain expertise in Angular and observables, as well as experience in API integration and user experience design.

## Duration:
LearningPlan.ai was conceptualized, developed, and refined over a period of three days, leveraging cutting-edge technologies and user-centered design principles to create a robust and impactful learning platform for users worldwide.