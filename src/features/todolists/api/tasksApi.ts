import {
    type DefaultResponse,
    type GetTasksResponse,
    type TaskOperationResponse,
    type UpdateTaskModel,
} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";
import {PAGE_COUNT} from "@/common/constants";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse,{ toDoid:string;params?:{page:number}}>({
            query: ({toDoid,params}) => {
                return {
                    method: 'get',
                    url: `/todo-lists/${toDoid}/tasks`,
                    params:{...params,count:PAGE_COUNT}
                }
            },
            //providesTags: ['Tasks']
            providesTags: (res,_err,{toDoid}) => (res ? [{ type: "Tasks", id:toDoid }] : ["Tasks"]),

        }),
        createTasks: build.mutation<TaskOperationResponse, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    method: 'post',
                    url: `/todo-lists/${id}/tasks`,
                    body: {title}
                }
            },
            //invalidatesTags: ['Tasks','toDoList']
            invalidatesTags: (_res, _err, { id }) => [{ type: "Tasks", id: id }],
        }),
        deleteTask: build.mutation<DefaultResponse, { id: string, taskId: string }>({
            query: ({id, taskId}) => {
                return {
                    method: 'delete',
                    url: `/todo-lists/${id}/tasks/${taskId}`
                }
            },
            //invalidatesTags: ['Tasks','toDoList']
            invalidatesTags: (_res, _err, { id }) => [{ type: "Tasks", id: id }],
        }),
        updateTask:build.mutation<TaskOperationResponse,{id: string, taskId: string, model: Partial<UpdateTaskModel>}>({
            async onQueryStarted({ id, taskId, model }, {dispatch, queryFulfilled,getState}) {
                const args = tasksApi.util.selectCachedArgsForQuery(getState(),'getTasks')

                let patchResults: any[] = []
                args.forEach(({ params }) => {
                    patchResults.push(
                        dispatch(
                            tasksApi.util.updateQueryData(
                                'getTasks',
                                { toDoid:id, params: { page: params?.page||1 } },
                                state => {
                                    const index = state.items.findIndex(task => task.id === taskId)
                                    if (index !== -1) {
                                        state.items[index] = { ...state.items[index], ...model }
                                    }
                                }
                            )
                        )
                    )
                })
                try {
                    await queryFulfilled
                } catch {
                    patchResults.forEach(patchResult => {
                        patchResult.undo()
                    })
                }
            },
            query:({id,taskId,model})=>{
                return {
                    method:'put',
                    url:`/todo-lists/${id}/tasks/${taskId}`,
                   body:model
                }
            },
           // invalidatesTags: ['Tasks']
            invalidatesTags: (_res, _err, { id }) => [{ type: "Tasks", id: id }],

        })
    })
})
export const {useGetTasksQuery,useCreateTasksMutation,useUpdateTaskMutation,useDeleteTaskMutation} = tasksApi


