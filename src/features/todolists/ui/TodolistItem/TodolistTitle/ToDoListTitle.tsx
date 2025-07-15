import Grid from "@mui/material/Grid"
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import {changeTitleTS} from "@/features/todolists/model/toDoList-reducer.ts"
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts"
import type {RequestStatus} from "@/common/types"
import {useDeleteToDoListMutation} from "@/features/todolists/api/todolistsApi.ts";

type ToDoListTitle = {
  title: string
  id: string
  entityStatus: RequestStatus
}

export const ToDoListTitle = ({ title, id, entityStatus }: ToDoListTitle) => {
  const dispatch = useAppDispatch()
  const [deleToDoList]= useDeleteToDoListMutation()
  const removeToDoListHandler = () => {
   deleToDoList(id)
  }
  const changeToDoTitleHandler = (title: string) => {
    dispatch(changeTitleTS({ title, id }))
  }
  return (
    <Grid
      container
      flex={1}
      spacing={2}
      justifyContent={"space-around"}
      alignItems={"center"}
      maxWidth={"100%"}
      maxHeight={"75px"}
    >
      <EditableSpan
        disabled={entityStatus === "loading"}
        fontsize={"24px"}
        title={title}
        changeTitle={changeToDoTitleHandler}
      />
      <IconButton
        loading={entityStatus === "loading"}
        onClick={removeToDoListHandler}
        aria-label="delete"
        color={"error"}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  )
}
