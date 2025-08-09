import {isErrorWithMessage} from "@/common/utils/isErrorWithMessage.ts";
import {BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue} from "@reduxjs/toolkit/query";
import {captchaTC, errorHandler} from "@/app/app-slice.ts";
import {ResultCode} from "@/common/enum/enum.ts";

export const handleError =  (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
    let error = 'Some error occurred'

    if (result.error) {
        switch (result.error.status) {
            case 'FETCH_ERROR':
            case 'PARSING_ERROR':
            case 'CUSTOM_ERROR':
                error = result.error.error
                break
            case 403:
                error = '403 Forbidden Error. Check API-KEY'
                break
            case 400:
            case 500:
                if (isErrorWithMessage(result.error.data)) {
                    error = result.error.data.message
                } else {
                    error = JSON.stringify(result.error.data)
                }
                break
            default:
                error = JSON.stringify(result.error)
                break
        }
        api.dispatch(errorHandler({ error }))
    }
const Err = (result.data as { resultCode: ResultCode }).resultCode
    if(Err===ResultCode.Success){
        api.dispatch(captchaTC({captcha:false}))
    }
    if (Err) {

        switch (Err) {
            case ResultCode.Error:

                const messages = (result.data as { messages: string[] }).messages
                error = messages.length ? messages[0] : error
                api.dispatch(errorHandler({ error }))
                break
            case ResultCode.CaptchaError:

                    api.dispatch(captchaTC({captcha:true}))
                api.dispatch(errorHandler({ error:'captcha error' }))
                break
            default:
                api.dispatch(errorHandler({ error:'' }))
        }

        }


}