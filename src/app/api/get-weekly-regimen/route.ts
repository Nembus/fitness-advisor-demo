import {NextResponse} from "next/server";

import {regimenSchema, weeklyRegimenInputSchema}     from "@/utils/schemas";
import {ChatOpenAI}                                  from "@langchain/openai";
import {ChatAnthropic}                               from "@langchain/anthropic";
import {provideAWeeklyRoutineBasedOnSelectionPrompt} from "@/utils/prompts";
import {StructuredOutputParser}                      from "langchain/output_parsers";

const modelOpenAi = new ChatOpenAI({
  modelName:   "gpt-3.5-turbo",
  temperature: 0.9,
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
    const validatedData = weeklyRegimenInputSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({error: validatedData.error.message, status: 400})
    }

    const {level, selection, LLM} = validatedData.data;

    const outputParser = StructuredOutputParser.fromZodSchema(
        regimenSchema
    );

    const currentModel = LLM === 'openai' ? modelOpenAi: modelAnthropic;

        console.log(`running ${LLM === 'openai' ? 'openai':'anthropic'} model`);

    const chain = provideAWeeklyRoutineBasedOnSelectionPrompt
        .pipe(currentModel)
        .pipe(outputParser);

    const response = await chain.invoke({
      level,
      selection,
      format_instructions: outputParser.getFormatInstructions(),
    });

    return NextResponse.json({response})


  } catch (error) {
    console.log(error);
    return NextResponse.json({error})
  }
}
