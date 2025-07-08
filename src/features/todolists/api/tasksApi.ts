import { instance } from "@/common/instance/instance.ts"

import {
  type DefaultResponse,
  type GetTasksResponse,
  type TaskOperationResponse,
  type UpdateTaskModel,
} from "@/common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTasks(todolistId: string, title: string) {
    return instance.post<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<DefaultResponse>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: Partial<UpdateTaskModel>) {
    return instance.put<TaskOperationResponse>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  },
}
