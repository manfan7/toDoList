import {Box} from "@mui/material"

import Button from "@mui/material/Button"
import {FilterValue} from "@/App.tsx"
import {containerSx} from "@/common/styles/container.styles.ts"
import {todolistsApi} from "@/features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type FilterButtons = {
  filter: FilterValue
  id: string
    changefilter?:(filter:FilterValue,id:string)=>void
}

export const FilterButtons = ({ filter, id }: FilterButtons) => {

const dispatch = useAppDispatch()
  const changeFilterHandler = (value: FilterValue,id:string) => {

      dispatch(todolistsApi.util.updateQueryData('getToDoList',undefined,(state)=>{

          const todolist = state.find((todolist) => todolist.id === id)
          if (todolist) {
              todolist.filter = value
          }
      }))

  }
  return (
    <Box sx={containerSx}>
      <Button variant={filter === "ALL" ? "contained" : "text"} color={"primary"} onClick={() => changeFilterHandler("ALL",id)}>
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changeFilterHandler("Active",id)}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"success"}
        onClick={() => changeFilterHandler("Completed",id)}
      >
        Completed
      </Button>
    </Box>
  )
}
