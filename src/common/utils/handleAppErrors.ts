import { changeLoading, errorHandler } from "@/app/app-slice.ts"

import type { Dispatch } from "@reduxjs/toolkit"
import type { BaseResponseZod, TaskOperationResponse } from "@/common/types"

export const handleAppError = (dispatch: Dispatch, data: BaseResponseZod | TaskOperationResponse) => {
  if (data?.messages?.length) {
    dispatch(errorHandler({ error: data.messages[0] }))
  } else {
    dispatch(errorHandler({ error: "Some error occurred" }))
  }
  dispatch(changeLoading({ status: "failed" }))
}
