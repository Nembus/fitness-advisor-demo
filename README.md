# Fitness Advisor Demo

This is a quick proof of concept project designed to show different interactions between one's domain data (database, in-memory store date, etc.), and external LLMs. 
We're using Langchain.js (although we might try [instructor](https://js.useinstructor.com) in a different branch) to help with tooling and aim to show basic intersections between our data, user selections, and LLMs, by using prompt templates with structured data extractions and RAG flows.

The contrived example is that of a Fitness Advisor (fitness recommendation tool). The flow is simple: 
1. The user selects their fitness level and their fitness goal (both normally stored in a database, but for now, it's in-memory)
levels = ['beginner', 'intermediate', 'advanced'];


    Fitness goals:

* Weight Loss
* Muscle Gain
* Endurance Building
* Flexibility Improvement
* Stress Reduction

2. We pass this selection to a Langchain chain:
LLM responds with options like "Beginner's Running Plan", "Cycling Interval Training", "Swimming Laps Solution", etc.
3. The user makes their selection, and we send that to the LLM for a final regimen creation.


RAG Flows:
We will need a vector database. Some options that Langchain can interface with are:
 local setup:
* Memory
* local Postgres with PGVector
* SQLite via Prisma?

remote:
* Supabase
and many other options

## Running the project
- Be sure to create an .env.local or .env file and enter OPENAI_API_KEY and ANTHROPIC_API_KEY if you're planning on using Anthropic.
- run pnpm install
- run pnpm dev
