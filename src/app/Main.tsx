import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { FullInput } from "@/common/components/CreateItemForm/FullInput.tsx"
import { addtoDoListTC } from "@/features/todolists/model/toDoList-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { Todolists } from "@/features/todolists/ui/ToDoLists/Todolists.tsx"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addToDoList = (value: string) => {
    dispatch(addtoDoListTC({ title: value }))
  }

  return (
    <Container maxWidth={"xl"}>
      <Grid
        container
        sx={{
          mb: "30px",
        }}
      >
        <FullInput addTask={addToDoList} />
      </Grid>
      <Grid container spacing={5}>
        <Todolists />
      </Grid>
    </Container>
  )
}
