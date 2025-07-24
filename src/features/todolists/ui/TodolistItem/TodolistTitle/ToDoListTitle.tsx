import Grid from "@mui/material/Grid"
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import type {RequestStatus} from "@/common/types"
import {
  todolistsApi,
  useDeleteToDoListMutation,
  useUpdateToDoListMutation
} from "@/features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type ToDoListTitle = {
  title: string
  id: string
  entityStatus: RequestStatus
}

export const ToDoListTitle = ({ title, id, entityStatus }: ToDoListTitle) => {
const dispatch = useAppDispatch()
  const [deleToDoList]= useDeleteToDoListMutation()
  const [updateToDo]= useUpdateToDoListMutation()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
        todolistsApi.util.updateQueryData('getToDoList', undefined, (state) => {
          const todolist = state.find((todolist) => todolist.id === id)
          if (todolist) {
            todolist.entityStatus = entityStatus
          }
        }),
    )
  }
  const removeToDoListHandler = () => {
    changeTodolistStatus('loading')


    deleToDoList(id).unwrap().catch(()=>{
      changeTodolistStatus('idle')
    })

  }
  const changeToDoTitleHandler = (title: string) => {
    updateToDo({id,title})
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
