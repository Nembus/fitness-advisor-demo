import {ChatPromptTemplate} from "@langchain/core/prompts";

/* fromMessage example:
*
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful chatbot.  Create a ...",
  ],
  ["human", "{word}"],
]);
* */

export const listWorkoutRoutinesPrompt = ChatPromptTemplate.fromTemplate(`List workout routines suitable for someone who is {level} aiming for {fitnessGoal}.
    Format Instructions: {format_instructions}`);

export const provideAWeeklyRoutineBasedOnSelectionPrompt = ChatPromptTemplate
    .fromTemplate(`Provide a detailed workout regiment for the week based on the following type of exercise: {selection} for someone who is {level}.
    Format Instructions: {format_instructions}`);

