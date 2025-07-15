import {instance} from "@/common/instance/instance.ts"

import {
    type DefaultResponse,
    type GetTasksResponse,
    type TaskOperationResponse,
    type UpdateTaskModel,
} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            query: (id) => {
                return {
                    method: 'get',
                    url: `/todo-lists/${id}/tasks`
                }
            },
            providesTags: ['Tasks']
        }),
        createTasks: build.mutation<TaskOperationResponse, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    method: 'post',
                    url: `/todo-lists/${id}/tasks`,
                    body: {title}
                }
            },
            invalidatesTags: ['Tasks']
        }),
        deleteTask: build.mutation<DefaultResponse, { id: string, taskId: string }>({
            query: ({id, taskId}) => {
                return {
                    method: 'delete',
                    url: `/todo-lists/${id}/tasks/${taskId}`
                }
            },
            invalidatesTags: ['Tasks']
        }),
        updateTask:build.mutation<TaskOperationResponse,{id: string, taskId: string, model: Partial<UpdateTaskModel>}>({
            query:({id,taskId,model})=>{
                return {
                    method:'put',
                    url:`/todo-lists/${id}/tasks/${taskId}`,
                   body:model
                }
            },
            invalidatesTags: ['Tasks']
        })
    })
})
export const {useGetTasksQuery,useCreateTasksMutation,useUpdateTaskMutation,useDeleteTaskMutation} = tasksApi

export const _tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<DefaultResponse>()
    },
    updateTask(todoListId: string, taskId: string, model: Partial<UpdateTaskModel>) {
        return instance.put<TaskOperationResponse>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
}
