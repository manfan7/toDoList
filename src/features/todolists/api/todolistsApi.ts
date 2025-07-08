import { instance } from "@/common/instance/instance.ts"
import type { BaseResponseZod, DefaultResponse, toDoList } from "@/common/types"

export const todolistsApi = {
  getToDoList() {
    return instance.get<toDoList[]>("/todo-lists")
  },
  createToDoList(title: string) {
    return instance.post<BaseResponseZod>("/todo-lists", { title })
  },
  deleteToDoList(id: string) {
    return instance.delete<DefaultResponse>(`/todo-lists/${id}`)
  },
  updateToDoList(id: string, title: string) {
    return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
  },
  reorderToDoList(targetId: string, currentId: string) {
    return instance.put<BaseResponseZod>(`/todo-lists/${currentId}/reorder`, { targetId })
  },
}
