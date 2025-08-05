import {BaseResponseZod, DefaultResponse, DomainToDo, toDoList} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";
import {arrayMove} from "@dnd-kit/sortable";

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
            async onQueryStarted(id: string, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getToDoList', undefined, state => {
                        const todolistIndex = state.findIndex(todolist => todolist.id === id)
                        if (todolistIndex !== -1) {
                            state.splice(todolistIndex, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
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
            async onQueryStarted({targetId,currentId}, {dispatch, queryFulfilled}) {

                const patchResult = dispatch(
                    todolistsApi.util.updateQueryData('getToDoList', undefined, state => {
                            const oldIndex = state?.findIndex((item) => item.id === targetId)
                            const newIndex = state?.findIndex((item) => item.id === currentId)


                            if(oldIndex!==-1&& newIndex!==-1 ) {
                               return arrayMove(state, oldIndex, newIndex)

                            }

                               /* const todolistIndex = state.findIndex(todolist => todolist.id === id)
                        if (todolistIndex !== -1) {
                            state.splice(todolistIndex, 1)
                        }*/
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            query: ({targetId, currentId}) => {
                return {
                    method: 'put',
                    url: `/todo-lists/${currentId}/reorder`,
                    body: {targetId}
                }
            },

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


