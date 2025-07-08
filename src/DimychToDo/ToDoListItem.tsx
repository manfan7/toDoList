import { FilterValue, Task } from "./App.tsx"
import Button from "@mui/material/Button"
import { EditableSpan } from "./ToDoListTitle.tsx"
import { ChangeEvent } from "react"
import { FullInput } from "../common/components/CreateItemForm/FullInput.tsx"
import IconButton from "@mui/material/IconButton"
import TaskAltIcon from "@mui/icons-material/TaskAlt"
import DeleteIcon from "@mui/icons-material/Delete"
import { Checkbox, Grid } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { green, pink } from "@mui/material/colors"
type ToDoPropsType = {
  title: string
  tasks: Task[]
  date?: string
  id: string
  onClick: (id: string, toDoId: string) => void
  changeFilter: (value: FilterValue, id: string) => void
  addTask: (value: string, toDoId: string) => void
  changeTaskStatus: (itemId: string, isDone: boolean, toDoId: string) => void
  filter: FilterValue
  removeToDoList: (id: string) => void
  editTask: (taskId: string, todoId: string, value: string) => void
  changeToDoTitle: (id: string, value: string) => void
}

export const ToDoListItem = ({
  title,
  tasks,
  onClick,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  id,
  removeToDoList,
  editTask,
  changeToDoTitle,
}: ToDoPropsType) => {
  const removeToDoListClb = () => {
    removeToDoList(id)
  }
  const addTaskHandler = (title: string) => {
    addTask(title, id)
  }
  const changeToDoTitleHandler = (value: string) => {
    changeToDoTitle(id, value)
  }

  return (
    <Grid
      container
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "20px",
      }}
      direction="column"
      spacing={3}
    >
      <div>
        <EditableSpan setInputValue={changeToDoTitleHandler} title={title} />
        <IconButton aria-label="delete" onClick={removeToDoListClb} color={"error"}>
          <DeleteIcon />
        </IconButton>
      </div>

      <FullInput addTask={addTaskHandler} />
      <Grid
        container
        sx={{
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        {tasks.length === 0 ? (
          <p>Тасок нет</p>
        ) : (
          <div>
            {tasks.map((task) => {
              const setTitleHandler = (title: string) => {
                editTask(task.id, id, title)
              }
              const removeItem = () => {
                onClick(task.id, id)
              }
              const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked, id)
              }
              return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeStatusHandler}
                    icon={
                      <NotificationsIcon
                        sx={{
                          color: pink[800],
                        }}
                      />
                    }
                    checkedIcon={<TaskAltIcon sx={{ color: green[500] }} />}
                  />

                  <EditableSpan title={task.title} setInputValue={setTitleHandler} />
                  <IconButton aria-label="delete" onClick={removeItem} color={"error"}>
                    <DeleteIcon />
                  </IconButton>
                </li>
              )
            })}
          </div>
        )}
      </Grid>
      <div>
        <Button
          variant={filter === "ALL" ? "contained" : "text"}
          sx={{
            "&:hover": {
              bgcolor: "primary.light", // Используем тему
              boxShadow: 2,
              color: "#fff",
            },
          }}
          // className={`${filter === 'ALL' ? classes.activeFilter : ''}`}
          onClick={() => changeFilter("ALL", id)}
        >
          All
        </Button>
        <Button
          variant={filter === "Active" ? "contained" : "text"}
          sx={{
            "&:hover": {
              bgcolor: "primary.light", // Используем тему
              boxShadow: 2,
              color: "#fff",
            },
          }}
          onClick={() => changeFilter("Active", id)}
        >
          Active
        </Button>
        <Button
          variant={filter === "Completed" ? "contained" : "text"}
          sx={{
            "&:hover": {
              bgcolor: "primary.light", // Используем тему
              boxShadow: 2,
              color: "#fff",
            },
          }}
          onClick={() => changeFilter("Completed", id)}
        >
          Completed
        </Button>
      </div>
    </Grid>
  )
}
