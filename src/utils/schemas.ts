import {z}  from "zod";
import data from "@/utils/data.json";

export const workoutRequestSchema = z.object({
  level:       z.string().refine(
      value => ['beginner', 'intermediate', 'advanced'].includes(value),
      {message: "Level must be 'beginner', 'intermediate', or 'advanced'"}
  ),
  fitnessGoal: z.string().refine(
      value => data.includes(value),
      {message: "Invalid fitnessGoal"}
  ),
  LLM:         z.string()
});

export const weeklyRegimenInputSchema = z.object({
  level:     z.string().refine(
      value => ['beginner', 'intermediate', 'advanced'].includes(value),
      {message: "Level must be 'beginner', 'intermediate', or 'advanced'"}
  ),
  selection: z.string(),
  LLM:       z.string()
});

export const workoutRoutineSchema = z.array(z.object({
  name:        z.string().describe("workout name"),
  description: z.string().describe('workout description')
}))

export const regimenSchema = z.array(z.object({
  day:          z.string().describe("day number"),
  instructions: z.array(z.string().describe('workout instructions for this day'))
}))
