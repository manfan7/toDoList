import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import {FullInput} from "@/common/components/CreateItemForm/FullInput.tsx"
import {Todolists} from "@/features/todolists/ui/ToDoLists/Todolists.tsx"
import {useCreateToDoListMutation} from "@/features/todolists/api/todolistsApi.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {changeLoading} from "@/app/app-slice.ts";

export const Main = () => {
    const [createToDoList]= useCreateToDoListMutation()
const dispatch = useAppDispatch()
  const addToDoList = (value: string) => {
  dispatch(changeLoading({status:'loading'}))
   createToDoList(value).unwrap().finally(()=>{
       dispatch(changeLoading({status:'idle'}))
   })
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
