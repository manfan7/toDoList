import Checkbox from "@mui/material/Checkbox"
import {EditableSpan} from "@/common/components/index.ts"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import {ChangeEvent} from "react"
import {getListItemSx} from "./TaskItem.styles"
import type {DomainTask, RequestStatus, UpdateTaskModel} from "@/common/types"
import {TaskStatus} from "@/common/enum/enum.ts"
import {useDeleteTaskMutation, useUpdateTaskMutation} from "@/features/todolists/api/tasksApi.ts";

type TaskItem = {
  id: string
  task: DomainTask
  entityStatus: RequestStatus
}

export const TaskItem = ({ task, id, entityStatus }: TaskItem) => {

const [removeTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const removeTaskHandler = () => {
    removeTask({taskId:task.id,id})
  }

  const updateTaskHandler = (param: string | ChangeEvent<HTMLInputElement>) => {
    let newTitle: string | undefined
    let newStatus: TaskStatus | undefined

    if (typeof param === "string") {
      newTitle = param
    } else {
      newStatus = param.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    }

    const model: UpdateTaskModel = {
      description: task.description,
      title: newTitle ?? task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: newStatus ?? task.status,
    }

   updateTask({id, taskId: task.id, model })
  }
  const isTaskComplet = task.status === TaskStatus.Completed
  return (
    <ListItem sx={getListItemSx(isTaskComplet)} draggable={true}>
      <div>
        <Checkbox
          color={isTaskComplet ? "success" : "error"}
          onChange={updateTaskHandler}
          checked={isTaskComplet}
          sx={{
            color: "#e57373",
          }}
        />
        <EditableSpan
          disabled={entityStatus === "loading"}
          title={task.title}
          key={task.id}
          isDone={isTaskComplet}
          changeTitle={updateTaskHandler}
        />
      </div>
      <IconButton color={!isTaskComplet ? "error" : "inherit"} onClick={removeTaskHandler} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
