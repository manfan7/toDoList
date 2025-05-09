import './App.css'
import {ToDoListItem} from "./ToDoListItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {FullInput} from "../components/FullInput.tsx";
import {ButtonAppBar} from "./AppBar.tsx";
import Container from '@mui/material/Container';
import {Grid} from '@mui/material';
import Paper from '@mui/material/Paper';

export type Task = {
    id: string
    title: string
    isDone: boolean
}
type Tasks = {
    [key: string]: Task[]
}
type ToDoInArray = {
    id: string
    title: string
    filter: FilterValue
}
export type FilterValue = 'ALL' | 'Active' | 'Completed'

export type ToDoLists = ToDoInArray[]

export const App = () => {

    let tdId1 = v1()
    let tdId2 = v1()
    const [tasks, setTasks] = useState<Tasks>({
        [tdId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [tdId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Food', isDone: false},
            {id: v1(), title: 'Watch', isDone: false}
        ]
    })

    let [todoLists, setToDoLists] = useState<ToDoLists>([
        {id: tdId1, title: 'What to lear', filter: 'Active'},
        {id: tdId2, title: 'What to Buy', filter: 'Completed'},
    ])

    const handleRemoveTask = (id: string, toDoId: string) => {
        const filteredTasks = tasks[toDoId].filter((item => item.id !== id))
        setTasks({
            ...tasks,
            [toDoId]: filteredTasks
        })
    }
    const addTask = (value: string, toDoId: string) => {
        let newTask = {id: v1(), title: value, isDone: false}
        let tasksNew = tasks[toDoId]
        setTasks({
            ...tasks,
            [toDoId]: [...tasksNew, newTask]
        })
    }
    const changeFilter = (value: FilterValue, toDoListId: string) => {
        let toDoCurrent = todoLists.map(t => t.id === toDoListId ? {...t, filter: value} : t)
        setToDoLists(toDoCurrent)
    }

    const changeStatus = (itemId: string, isDone: boolean, toDoId: string) => {
        setTasks({
            ...tasks,
            [toDoId]: tasks[toDoId].map(task => task.id === itemId ? {...task, isDone} : task)
        })
    }
    const removeToDoList = (toDoId: string) => {
        setToDoLists(todoLists.filter(item => item.id !== toDoId))
        delete tasks[toDoId]
        setTasks({...tasks})
    }
    const addToDoList = (title: string) => {
        let toDOlist: ToDoInArray = {id: v1(), title, filter: 'Active'}
        setToDoLists([...todoLists, toDOlist])
        setTasks({...tasks, [toDOlist.id]: []})
    }
    const editTask = (taskId: string, toDoId: string, value: string) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].map(item => item.id === taskId ? {...item, title: value} : item)})
    }
    const changeToDoTitle = (id: string, title: string) => {
        setToDoLists(todoLists.map(item => item.id === id ? {...item, title} : item))
    }
    return (

        <div className="app">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container spacing={2} sx={{
                    marginBottom: "30px"

                }}>
                    <FullInput addTask={addToDoList}/>
                </Grid>
                <Grid container spacing={3} sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                }}>
                    {todoLists.map(t => {
                        let tasksForToDoList = tasks[t.id]
                        if (t.filter === 'Active') {
                            tasksForToDoList = tasks[t.id].filter((item => item.isDone === false))
                        }
                        if (t.filter === 'Completed') {
                            tasksForToDoList = tasks[t.id].filter((item => item.isDone === true))
                        }
                        return (
                            <Grid container spacing={4} sx={{
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                            }}>
                                <Paper elevation={2}>
                                    <ToDoListItem key={t.id}
                                                  id={t.id}
                                                  removeToDoList={removeToDoList}
                                                  onClick={handleRemoveTask}
                                                  changeFilter={changeFilter}
                                                  changeTaskStatus={changeStatus}
                                                  addTask={addTask}
                                                  filter={t.filter}
                                                  title={t.title}
                                                  tasks={tasksForToDoList}
                                                  editTask={editTask}
                                                  changeToDoTitle={changeToDoTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

