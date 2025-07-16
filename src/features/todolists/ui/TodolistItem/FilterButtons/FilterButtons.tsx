import {Box} from "@mui/material"

import Button from "@mui/material/Button"
import {FilterValue} from "@/App.tsx"
import {containerSx} from "@/common/styles/container.styles.ts"

type FilterButtons = {
  filter: FilterValue
  id: string
    changefilter:(filter:FilterValue,id:string)=>void
}

export const FilterButtons = ({ filter, id,changefilter }: FilterButtons) => {
/*  const dispatch = useAppDispatch()

  const changeFilter = (value: FilterValue) => {

    dispatch(changeFilterAC({ filter: value, id }))
  }*/
  return (
    <Box sx={containerSx}>
      <Button variant={filter === "ALL" ? "contained" : "text"} color={"primary"} onClick={() => changefilter("ALL",id)}>
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"secondary"}
        onClick={() => changefilter("Active",id)}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"success"}
        onClick={() => changefilter("Completed",id)}
      >
        Completed
      </Button>
    </Box>
  )
}
