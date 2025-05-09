import './App.css'
import {ToDoListItem} from "./ToDoListItem.tsx";
import {memo, useCallback, useState} from "react";
import {v1} from "uuid";
import {FullInput} from "./components/FullInput.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from "@mui/material/Paper";
import {NavButton} from "./components/NavButton.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {CssBaseline} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer.ts";
import {addtoDoListAC, changeFilterAC, changeTitleAC, removeToDoListAC} from "./state/toDoList-reducer.ts";
import {useAppDispatch} from "./common/hooks/useAppDispatch.ts";
import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectToDoList} from './state/toDoSelectors.ts';
import {selectTasks} from "./state/tasks-selectors.ts";


export type FilterValue = 'ALL' | 'Active' | 'Completed'
export const tdId1 = v1()
export const tdId2 = v1()
export type Task = {
    id: string
    title: string
    isDone: boolean

}
export type tasksListType = Record<string, Task[]>
export type toDotype = {
    id: string
    title: string
    filter: FilterValue
}
export type toDoStateType = toDotype[]
type ThemeMode = 'dark' | 'light'
export let tasksList: tasksListType = {
    [tdId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [tdId2]: [
        {id: v1(), title: 'Book', isDone: true},
        {id: v1(), title: 'Food', isDone: false},
        {id: v1(), title: 'Tickets', isDone: false}
    ]
}

export let toDo: toDoStateType = [
    {id: tdId1, title: 'What to learn', filter: 'ALL'},
    {id: tdId2, title: 'What to buy', filter: 'ALL'},
]


export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#ef6c00',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
const dispatch = useAppDispatch()
    const tasks = useAppSelector(selectTasks);
    const toDoLists = useAppSelector(selectToDoList)
    const handleRemoveTask = (id: string, tdId: string) => {
        dispatch(removeTaskAC({taskId:id,toDoId:tdId}))
    }
    const addTask = (value: string, tdId: string) => {
        dispatch(addTaskAC(value,tdId))
    }
    const changeFilter = (value: FilterValue, tdId: string) => {
        dispatch(changeFilterAC({filter:value, id:tdId}))
    }
    const changeStatus = useCallback((itemId: string, value: boolean, tdId: string) => {
        dispatch(changeTaskStatusAC({id:itemId,toDoId:tdId,isDone:value}))
    },[dispatch])


    const removeList = (tdId: string) => {
        dispatch(removeToDoListAC({id:tdId}))
           }
    const addToDoList = (value: string) => {
       dispatch(addtoDoListAC(value))
    }
    const changeTaskTitle = (taskId: string, toDoId: string, title: string) => {
        dispatch(changeTaskTitleAC({id:taskId,title,toDoId}))
    }
    const changeToDoTitle = (toDoId: string, title: string) => {
        dispatch(changeTitleAC({title, id:toDoId}))
    }

    const filterTask = (task: tasksListType, filterVal: FilterValue, tdId: string) => {

        if (filterVal === 'ALL') return task[tdId]
        return filterVal === 'Completed' ? task[tdId].filter(t => t.isDone) : task[tdId].filter(t => !t.isDone)
    }
    const MemoToDoList = memo(ToDoListItem)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app">
                <AppBar position="static" sx={{
                    backgroundColor: '#332163',
                    mb: '30px'
                }}>
                    <Toolbar>
                        <Container maxWidth={'xl'}>
                            <Grid container alignItems={'center'} spacing={2}>
                                <IconButton color="inherit">
                                    <MenuIcon/>
                                </IconButton>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    Igor Grytsuk
                                </Typography>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={'#7a6bd1'}>FAQ</NavButton>
                                <FormControlLabel control={<Switch
                                    color={'default'}
                                    onChange={changeMode}
                                    defaultChecked/>} label="Change theme"/>
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'xl'}>
                    <Grid container sx={{
                        mb: '30px'
                    }}>
                        <FullInput addTaskTitle addTask={addToDoList}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {toDoLists.map(t => {
                            let tasksForToDoList =  filterTask(tasks, t.filter, t.id)
                            return (
                                <Grid container key={t.id}>
                                    <Paper elevation={8} sx={{
                                        p: '10px 20px 20px 20px',
                                        display: 'flex'
                                    }}>
                                        <MemoToDoList
                                            id={t.id}
                                            onChangeStatus={changeStatus}
                                            removeTask={handleRemoveTask}
                                            changeFilter={changeFilter}
                                            toDoList={t}
                                            tasks={tasksForToDoList}
                                            addTask={addTask}
                                            removeList={removeList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeToDoTitle={changeToDoTitle}

                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

