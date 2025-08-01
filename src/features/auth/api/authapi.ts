import type {LoginInputs} from "@/features/auth/lib/shemas"
import {AuthResponseType, authRresponse, DefaultResponse} from "@/common/types"
import {baseApi} from "@/features/todolists/api/baseApi.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


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
export const captchaApi = createApi({
    reducerPath: 'captchaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0' }),
    endpoints: (build) => ({
        getCaptcha: build.query<{url:string}, void>({
            query: () => `/security/get-captcha-url`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints



export const {useAuthMeQuery,useLogoutMutation,useLoginMutation}= authApi
export const {useGetCaptchaQuery} = captchaApi