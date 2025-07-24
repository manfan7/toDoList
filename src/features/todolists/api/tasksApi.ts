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
            invalidatesTags: ['Tasks','toDoList']
        }),
        deleteTask: build.mutation<DefaultResponse, { id: string, taskId: string }>({
            query: ({id, taskId}) => {
                return {
                    method: 'delete',
                    url: `/todo-lists/${id}/tasks/${taskId}`
                }
            },
            invalidatesTags: ['Tasks','toDoList']
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


