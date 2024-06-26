import {NextResponse} from "next/server";
import {ChatOpenAI}             from "@langchain/openai";
import {ChatAnthropic}          from "@langchain/anthropic";
import {StructuredOutputParser} from "langchain/output_parsers";
import {ConsoleCallbackHandler} from "@langchain/core/tracers/console";
import {
  workoutRequestSchema,
  workoutRoutineSchema
}                               from "@/utils/schemas";

import {listWorkoutRoutinesPrompt} from "@/utils/prompts"

const modelOpenAi = new ChatOpenAI({
  modelName:   "gpt-3.5-turbo",
  temperature: 0.7,
  // uncomment  below if you need logging
  // callbacks: [new ConsoleCallbackHandler()],
});

const modelAnthropic = new ChatAnthropic({
  model: "claude-3-sonnet-20240229",
  apiKey: process.env.ANTHROPIC_API_KEY
});


export async function POST(req: Request) {
  const body = await req.json();
  try {
    // Validate the request data
    const validatedData = workoutRequestSchema.safeParse(body);

    if (!validatedData.success) {
      // Send back an error if the data is not valid
      return NextResponse.json({error: validatedData.error.message, status: 400})
    }

    const {level, fitnessGoal, LLM} = validatedData.data;


    const outputParser = StructuredOutputParser.fromZodSchema(
        workoutRoutineSchema
    );

    const currentModel = LLM === 'openai' ? modelOpenAi: modelAnthropic;

    console.log(`running ${LLM === 'openai' ? 'openai':'anthropic'} model`);

    const chain = listWorkoutRoutinesPrompt
        .pipe(currentModel)
        .pipe(outputParser);

    const response = await chain.invoke({
      level,
      fitnessGoal,
      format_instructions: outputParser.getFormatInstructions(),
    });

    return NextResponse.json({response})

  } catch (error) {
    console.log(error);
    return NextResponse.json({error})
  }
}
