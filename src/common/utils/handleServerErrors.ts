import { changeLoading, errorHandler } from "@/app/app-slice.ts"

import type { Dispatch } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { z } from "zod/v4"

export const handleServerError = (dispatch: Dispatch, error: any) => {
  let errorMessage

  switch (true) {
    case isAxiosError(error):
      errorMessage = error.response?.data?.message || error.message
      break
    case error instanceof Error:
      errorMessage = `Native error: ${error.message}`
      break
    case error instanceof z.ZodError:
      console.table(error.issues)
      errorMessage = "Zod error. Смотри консоль"
      break
    default:
      errorMessage = JSON.stringify(error)
  }

  dispatch(errorHandler({ error: errorMessage }))
  dispatch(changeLoading({ status: "failed" }))
}
