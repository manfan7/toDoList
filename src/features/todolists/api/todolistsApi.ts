import {instance} from "@/common/instance/instance.ts"
import {BaseResponseZod, DefaultResponse, DomainToDo, toDoList} from "@/common/types"
import {BaseQueryMeta, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";

export const todolistsApi = createApi({
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
    getToDoList: builder.query<DomainToDo[], void>({
      query: () => ({
        url: '/todo-lists',
        method: 'GET'
      }),
      transformResponse: (todoLists: toDoList[], _meta: any, _arg: any): DomainToDo[] => {
        return todoLists.map(item => ({...item, filter: 'ALL', entityStatus: "idle" }))
      }
    }),
    createToDoList: builder.mutation<BaseResponseZod, string>({
      query: (title) => {
        return {
          method: 'POST',
          url: '/todo-lists',
          body: { title }
        }
      }
    }),
    deleteToDoList:builder.mutation<DefaultResponse,string>({
      query:(id)=>{
        return {
          method:'delete',
          url:`/todo-lists/${id}`

        }
      }
    })
  })
});
export const {useGetToDoListQuery,useLazyGetToDoListQuery, useCreateToDoListMutation,useDeleteToDoListMutation}= todolistsApi

export const _todolistsApi = {

  updateToDoList(id: string, title: string) {
    return instance.put<DefaultResponse>(`/todo-lists/${id}`, { title })
  },
  reorderToDoList(targetId: string, currentId: string) {
    return instance.put<BaseResponseZod>(`/todo-lists/${currentId}/reorder`, { targetId })
  },
}
