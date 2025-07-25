import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AUTH_TOKEN} from "@/common/constants";
import {errorHandler} from "@/app/app-slice.ts";
import {isErrorWithMessage} from "@/common/utils/isErrorWithMessage.ts";

export const baseApi = createApi({
    reducerPath: "todolistsApi",
    tagTypes: ["toDoList", 'Tasks'],
    baseQuery: async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set("API-KEY", import.meta.env.VITE_API_KEY)
                headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            },
        })(args, api, extraOptions)

        if (result.error) {
            if (result.error.status === 'FETCH_ERROR') {
                api.dispatch(errorHandler({error: result.error.error}))
            }
            if (result.error.status === 403 || result.error.status === 500) {
                if (isErrorWithMessage(result.error.data)) {
                    api.dispatch(errorHandler({error: result.error.data.message}))
                } else {
                    api.dispatch(errorHandler({error: JSON.stringify(result.error.data)}))
                }
            }
        }

        return result
    },
    endpoints: () => ({}),
})