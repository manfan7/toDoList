import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {FilterValue} from "@/App.tsx"
import {useCallback, useEffect, useRef, useState} from "react"
import {ToDoListItem} from "@/features/todolists/ui/TodolistItem/ToDoListItem.tsx"
import {DomainTask} from "@/common/types"
import {TaskStatus} from "@/common/enum/enum.ts"
import {closestCenter, DndContext, DragEndEvent, DragOverlay, type DragStartEvent} from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import {restrictToWindowEdges} from "@dnd-kit/modifiers"
import {useGetToDoListQuery, useReorderToDoListMutation} from "@/features/todolists/api/todolistsApi.ts";
import {TodolistSkeleton} from "@/features/todolists/ui/ToDoLists/toDoListSkeleton.tsx";

export const filterTask = (task: DomainTask[]| undefined, filterVal: FilterValue) => {

    if (filterVal === "ALL") return task||[]

  return filterVal === "Completed"
    ? task?.filter((t) => t.status === TaskStatus.Completed)
    : task?.filter((t) => t.status === TaskStatus.New)
}

export const Todolists = () => {

  //const loading = useAppSelector(selectLoadingState)

  const [activeId, setActiveId] = useState<string | null>(null)
  const isMounted = useRef(false)

  // Первоначальная загрузка данных

      // const [trigger,{data }] = useLazyGetToDoListQuery() можно делать lazyloader, выполняется по условию
    const {data:todo,isLoading} = useGetToDoListQuery(undefined,{
        pollingInterval: 100000,
        skipPollingIfUnfocused: true,
    })


    const [reorder]= useReorderToDoListMutation()
    const [optimisticTodolists, setOptimisticTodolists] = useState(todo)
  // Синхронизация локального состояния с Redux

  useEffect(() => {
    if (isMounted.current) {
        if(todo){
            setOptimisticTodolists(todo)
        }
    } else {
      isMounted.current = true
    }
  }, [todo])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }, [])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event

      if (!over || active.id === over.id) return

      // Оптимистичное обновление
      const oldIndex = optimisticTodolists?.findIndex((item) => item.id === active.id)
      const newIndex = optimisticTodolists?.findIndex((item) => item.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return
if(optimisticTodolists ){
    const newOrder = arrayMove(optimisticTodolists, oldIndex||+active.id, newIndex||+over.id)
    setOptimisticTodolists(newOrder)
    setActiveId(null)
}
        try {
            await reorder({ currentId: active.id as string, targetId: over.id as string }).unwrap()
        } catch (error) {
            // В случае ошибки возвращаем предыдущее состояние
            setOptimisticTodolists(todo || [])
            console.error('Failed to reorder:', error)
        }

    },
    [ optimisticTodolists,reorder,todo],
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={optimisticTodolists|| []} strategy={verticalListSortingStrategy}>
          <Grid container spacing={2}>
              {isLoading ? (
                  // Показываем 3-5 заглушек для примера
                  [...Array(3)].map((_, i) => (
                      <Grid container key={i}>
                          <TodolistSkeleton />
                      </Grid>
                  ))
              ) : (
                  todo?.map((t) => (
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
                  ))
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
            <ToDoListItem  toDoList={todo?.find((t) => t.id === activeId)!} />
          </Paper>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
