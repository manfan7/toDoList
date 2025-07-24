import {FullInput} from "@/common/components/index.ts"
import Grid from "@mui/material/Grid"
import {ToDoListTitle} from "@/features/todolists/ui/TodolistItem/TodolistTitle/ToDoListTitle.tsx"
import {FilterButtons} from "@/features/todolists/ui/TodolistItem/FilterButtons/FilterButtons.tsx"
import {Tasks} from "@/features/todolists/ui/TodolistItem/Tasks/Tasks.tsx"
import type {DomainToDo} from "@/common/types"
import {useSortable} from "@dnd-kit/sortable"
import BackHandIcon from "@mui/icons-material/BackHand"
import {CSS} from "@dnd-kit/utilities"
import {useCreateTasksMutation} from "@/features/todolists/api/tasksApi.ts";

type ToDoProps = {
  toDoList: DomainToDo

}

export const ToDoListItem = ({ toDoList: { title, filter, id, entityStatus } }: ToDoProps) => {

    const [addTask] = useCreateTasksMutation()
  const addTaskHandler = (value: string) => {
   addTask({id, title: value })
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: "100%",
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Grid
        container
        flexDirection={"column"}
        width={"250px"}
        sx={{
          position: "relative",
          display: "flex",
          flex: 1,
          height: "100%",
          zIndex: 2, // Важно: должен быть выше слоя перетаскивания
          pointerEvents: isDragging ? "none" : "auto", // Отключаем события при перетаскивании
        }}
      >
        <BackHandIcon
          {...listeners}
          color="secondary"
          sx={{
            fontSize: 60,
            position: "absolute",
            right: 50,
            top: -45,
            cursor: "pointer",
            border: "1px solid secondary",
            backgroundColor: "transparent",
            transition: ".4s",
            boxShadow: "03px 6px 7px 6px rgba(24,0,0,0.4)",
            borderRadius: "50%",
            "&:hover": {
              boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
              color: "primary.main", // Пример изменения цвета при наведении
              transform: "scale(1.1)", // Пример анимации
            },
          }}
        />
        <ToDoListTitle title={title} id={id} entityStatus={entityStatus} />
        <FullInput addTask={addTaskHandler} disabled={entityStatus === "loading"} />
        <Tasks filter={filter} id={id} entityStatus={entityStatus} />
        <FilterButtons  filter={filter} id={id} />
      </Grid>
    </div>
  )
}
