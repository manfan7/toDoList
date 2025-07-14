import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {FilterValue} from "@/App.tsx"
import {useCallback, useEffect, useRef, useState} from "react"
import {ToDoListItem} from "@/features/todolists/ui/TodolistItem/ToDoListItem.tsx"
import {useAppSelector} from "@/common/hooks/useAppSelector.ts"
import type {tasksListType} from "@/common/types"
import {TaskStatus} from "@/common/enum/enum.ts"

import {Skeleton} from "@mui/material"
import {selectLoadingState} from "@/app/app-slice.ts"
import {closestCenter, DndContext, DragOverlay, type DragStartEvent} from "@dnd-kit/core"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {restrictToWindowEdges} from "@dnd-kit/modifiers"
import {useGetToDoListQuery} from "@/features/todolists/api/todolistsApi.ts";

export const filterTask = (task: tasksListType, filterVal: FilterValue, tdId: string) => {
  if (filterVal === "ALL") return task[tdId]
  return filterVal === "Completed"
    ? task[tdId].filter((t) => t.status === TaskStatus.Completed)
    : task[tdId].filter((t) => t.status === TaskStatus.New)
}

export const Todolists = () => {

  const loading = useAppSelector(selectLoadingState)
    //const [skip, setSkip] = useState(true)

  const [activeId, setActiveId] = useState<string | null>(null)
  const isMounted = useRef(false)

  // Первоначальная загрузка данных
  //const {data} = useGetToDoListQuery(undefined,{skip})
      // const [trigger,{data }] = useLazyGetToDoListQuery() можно делать lazyloader, выполняется по условию
    const {data} = useGetToDoListQuery()
    const [optimisticTodolists, setOptimisticTodolists] = useState(data)
  // Синхронизация локального состояния с Redux

  useEffect(() => {
    if (isMounted.current) {
        if(data){
            setOptimisticTodolists(data)
        }

    } else {
      isMounted.current = true
    }
  }, [data])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])
  /*  const fetchTodolists = () => {
        setSkip(false)
    }*/
  /*const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event

      if (!over || active.id === over.id) return

      // Оптимистичное обновление
      const oldIndex = optimisticTodolists?.findIndex((item) => item.id === active.id)
      const newIndex = optimisticTodolists?.findIndex((item) => item.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return
if(optimisticTodolists){
    const newOrder = arrayMove(optimisticTodolists, oldIndex, newIndex)
    setOptimisticTodolists(newOrder)
    setActiveId(null)
}


      try {
        // Фоновая синхронизация с сервером
        await dispatch(
          reorderToDo({
            draggedId: active.id as string,
            targetId: over.id as string,
            reordered: newOrder,
          }),
        ).unwrap()
      } catch (error) {
        // Откат при ошибке
        setOptimisticTodolists(toDo)
      }
    },
    [dispatch, optimisticTodolists],
  )*/

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      //onDragEnd={handleDragEnd}
    >
      <SortableContext items={data||[]} strategy={verticalListSortingStrategy}>
        <Grid container spacing={2}>
          {data?.map((t) =>
            loading === "loading" ? (
              <Grid container key={t.id}>
                <Skeleton
                  variant="rectangular"
                  width={250}
                  height={150}
                  sx={{
                    mb: 2,
                    transform: t.id === activeId ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </Grid>
            ) : (
              <Grid container key={t.id}>
                <Paper
                  elevation={t.id === activeId ? 12 : 4}
                  sx={{
                    p: 2,
                    transition: "all 0.3s ease",
                    transform: t.id === activeId ? "scale(1.02)" : "scale(1)",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <ToDoListItem toDoList={t} />
                </Paper>
              </Grid>
            ),
          )}
        </Grid>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: "ease",
        }}
      >
        {activeId ? (
          <Paper
            sx={{
              p: 2,
              width: 250,
              opacity: 0.8,
              backgroundColor: "black",
              borderRadius: "16px",
              transform: "rotate(3deg)",
              boxShadow: 16,
              transition: "opacity 0.5s ease, transform 0.2s ease backgroundColor 0.4s ease",
            }}
          >
            <ToDoListItem toDoList={optimisticTodolists?.find((t) => t.id === activeId)!} />
          </Paper>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
