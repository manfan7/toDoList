import { instance } from "@/common/instance/instance.ts"
import type { LoginInputs } from "@/features/auth/lib/shemas"
import type { AuthResponseType, authRresponse, DefaultResponse } from "@/common/types"

export const authApi = {
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
