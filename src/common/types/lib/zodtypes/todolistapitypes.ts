import z from "zod/v4"

export const todolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.int(),
})
