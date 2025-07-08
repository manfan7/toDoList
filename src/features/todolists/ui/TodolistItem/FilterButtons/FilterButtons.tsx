import { Box } from "@mui/material"

import Button from "@mui/material/Button"
import { FilterValue } from "@/App.tsx"
import { changeFilterAC } from "@/features/todolists/model/toDoList-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"

type FilterButtons = {
  filter: FilterValue
  id: string
}

export const FilterButtons = ({ filter, id }: FilterButtons) => {
  const dispatch = useAppDispatch()

  const changeFilter = (value: FilterValue) => {
    dispatch(changeFilterAC({ filter: value, id }))
  }
  return (
    <Box sx={containerSx}>
      <Button variant={filter === "ALL" ? "contained" : "text"} color={"primary"} onClick={() => changeFilter("ALL")}>
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"success"}
        onClick={() => changeFilter("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
