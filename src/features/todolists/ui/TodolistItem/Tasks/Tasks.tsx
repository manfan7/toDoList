import List from "@mui/material/List"

import {filterTask} from "@/features/todolists/ui/ToDoLists/Todolists.tsx"
import {FilterValue} from "@/App.tsx"
import {TaskItem} from "@/features/todolists/ui/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import type {DomainTask, RequestStatus} from "@/common/types"
import {useGetTasksQuery} from "@/features/todolists/api/tasksApi.ts";
import {useState} from "react";
import {TasksPagination} from "@/features/todolists/ui/TodolistItem/Tasks/TasksPagination/TaskPagination.tsx";
import {PAGE_COUNT} from "@/common/constants";

type Tasks = {
  filter: FilterValue
  id: string
  entityStatus: RequestStatus
}
export const Tasks = ({ filter, id, entityStatus }: Tasks) => {
  const [page, setPage] = useState(1)
  const {data} = useGetTasksQuery({toDoid:id,params:{page}})

  let tasksForToDoList = filterTask(data?.items, filter)
const isPaginatition = data && data.totalCount>PAGE_COUNT
  return (
    <>
      {tasksForToDoList?.length === 0 ? (
        <>Тасок нет</>
      ) : (
          <>
            <List
                sx={{
                  flex: "3",
                }}
            >
              {tasksForToDoList?.map((task: DomainTask) => {
                return <TaskItem key={task.id} task={task} id={id} entityStatus={entityStatus} />
              })}
            </List>
            {isPaginatition && <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />}
          </>

      )}
    </>
  )
}
