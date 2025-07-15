import {BaseResponseZod, DefaultResponse, DomainToDo, toDoList} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getToDoList: builder.query<DomainToDo[], void>({
            query: () => ({
                url: '/todo-lists',
                method: 'GET'
            }),
            transformResponse: (todoLists: toDoList[], _meta: any, _arg: any): DomainToDo[] => {
                return todoLists.map(item => ({...item, filter: 'ALL', entityStatus: "idle"}))
            },
            providesTags: ['toDoList']
        }),
        createToDoList: builder.mutation<BaseResponseZod, string>({
            query: (title) => {
                return {
                    method: 'POST',
                    url: '/todo-lists',
                    body: {title}
                }
            },
            invalidatesTags: ['toDoList']
        }),
        deleteToDoList: builder.mutation<DefaultResponse, string>({
            query: (id) => {
                return {
                    method: 'delete',
                    url: `/todo-lists/${id}`

                }
            },
            invalidatesTags: ['toDoList']
        }),
        updateToDoList: builder.mutation<DefaultResponse, { id: string, title: string }>({
            query: ({id, title}) => {
                return {
                    method: 'put',
                    url: `/todo-lists/${id}`,
                    body: {title}
                }
            },
            invalidatesTags: ['toDoList']
        }),
        reorderToDoList: builder.mutation<BaseResponseZod, { targetId: string, currentId: string }>({
            query: ({targetId, currentId}) => {
                return {
                    method: 'put',
                    url: `/todo-lists/${currentId}/reorder`,
                    body: {targetId}
                }
            },
            //invalidatesTags: ['toDoList']
        })

    })
});
export const {
    useGetToDoListQuery,
    useLazyGetToDoListQuery,
    useCreateToDoListMutation,
    useDeleteToDoListMutation,
    useUpdateToDoListMutation,
    useReorderToDoListMutation
} = todolistsApi


