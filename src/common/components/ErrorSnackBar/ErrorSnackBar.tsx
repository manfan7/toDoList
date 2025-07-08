import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"

import { Alert } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { errorHandler, selectError } from "@/app/app-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

export function ErrorSnackBar() {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(errorHandler({ error: null }))
  }

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message="Note archived">
        <Alert onClose={handleClose} severity={"error"} variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
