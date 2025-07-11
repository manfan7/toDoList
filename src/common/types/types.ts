import type { FilterValue } from "@/App.tsx"
import { domainTaskSchema } from "@/common/types/lib/zodtypes"
import { z } from "zod/v4"
import { todolistSchema } from "@/common/types/lib/zodtypes/todolistapitypes.ts"
import { ResultCode } from "@/common/enum/enum.ts"

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

export type FieldError = z.infer<typeof fieldErrorSchema>

export type BaseResponse<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.enum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })

export type DomainTask = z.infer<typeof domainTaskSchema>
export type UpdateTaskModel = Omit<DomainTask, "id" | "todoListId" | "order" | "addedDate">

export const getTasksSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array(),
})
export const taskOperationResponseSchema = baseResponseSchema(
  z.object({
    item: domainTaskSchema,
  }),
)
export const createTodolistResponseSchema = baseResponseSchema(
  z.object({
    item: todolistSchema,
  }),
)
export const authResponseShema = baseResponseSchema(
  z.object({
    userId: z.int(),
    token: z.string(),
  }),
).omit({ fieldsErrors: true })
export const authShema = baseResponseSchema(
  z.object({
    id: z.number().optional(),
    email: z.string().optional(),
    login: z.string().optional(),
  }),
)
export const defaultResponseSchema = baseResponseSchema(z.object({}))

export const responseShema = defaultResponseSchema.omit({ fieldsErrors: true })
export type DefaultResponse = z.infer<typeof defaultResponseSchema>
export type BaseResponseZod = z.infer<typeof createTodolistResponseSchema>
export type TaskOperationResponse = z.infer<typeof taskOperationResponseSchema>
export type GetTasksResponse = z.infer<typeof getTasksSchema>
export type toDoList = z.infer<typeof todolistSchema>
export type DomainToDo = toDoList & { filter: FilterValue; entityStatus: RequestStatus }
export type tasksListType = Record<string, DomainTask[]>
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type AuthResponseType = Omit<z.infer<typeof authResponseShema>, "fieldsErrors">
export type ResponseWithoutfieldserror = z.infer<typeof responseShema>
export type authRresponse = z.infer<typeof authShema>
