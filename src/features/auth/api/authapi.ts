import {instance} from "@/common/instance/instance.ts"
import type {LoginInputs} from "@/features/auth/lib/shemas"
import {AuthResponseType, authRresponse, DefaultResponse} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponseType, LoginInputs>({
            query: (args) => ({
                url: `/auth/login`,
                method: 'POST',
                body: args
            }),
        }),
        authMe: build.query<authRresponse, void>({
            query: () => ({
                url: `/auth/me`,
                method: 'get'
            })
        }),
        logout: build.mutation<DefaultResponse, void>({
            query: () => ({
                url: `/auth/login`,
                method: 'delete'
            })
        }),
    })
})



export const {useAuthMeQuery,useLogoutMutation,useLoginMutation}= authApi
export const _authApi = {
    login: function (args: LoginInputs) {
        return instance.post<AuthResponseType>(`/auth/login`, args)
    },
    logout() {
        return instance.delete<DefaultResponse>(`/auth/login`)
    },
    authMe() {
        return instance.get<authRresponse>(`/auth/me`)
    },
}
