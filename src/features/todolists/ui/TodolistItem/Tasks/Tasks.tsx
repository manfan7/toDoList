import List from "@mui/material/List"

import {filterTask} from "@/features/todolists/ui/ToDoLists/Todolists.tsx"
import {FilterValue} from "@/App.tsx"
import {TaskItem} from "@/features/todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import type {DomainTask, RequestStatus} from "@/common/types"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {errorHandler} from "@/app/app-slice.ts";
import {useEffect} from "react";

type Tasks = {
  filter: FilterValue
  id: string
  entityStatus: RequestStatus
}
export const Tasks = ({ filter, id, entityStatus }: Tasks) => {
const dispatch = useAppDispatch()
  const {data,isError,error} = useGetTasksQuery('id')
  useEffect(() => {
    if(!!error){
      dispatch(errorHandler({error:JSON.stringify((error as any).data)}))
    }
  }, [error]);
  let tasksForToDoList = filterTask(data?.items, filter)



  return (
    <>
      {tasksForToDoList?.length === 0 ? (
        <>Тасок нет</>
      ) : (
        <List
          sx={{
            flex: "3",
          }}
        >
          {tasksForToDoList?.map((task: DomainTask) => {
            return <TaskItem key={task.id} task={task} id={id} entityStatus={entityStatus} />
          })}
        </List>
      )}
    </>
  )
}
