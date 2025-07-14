import {instance} from "@/common/instance/instance.ts"
import type {BaseResponseZod, DefaultResponse, toDoList} from "@/common/types"
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";

export const todoListApi = createApi({
  reducerPath: 'todoListApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("API-KEY", import.meta.env.VITE_API_KEY);
      headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getToDoLists: builder.query<any, void>({
      query: () => ({
        url: '/todo-lists',
        method: 'GET'
      })
    })
  })
});


export const _todolistsApi = {
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
