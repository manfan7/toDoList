import {FilterValue, Task, toDotype} from "./App.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {FullInput} from "./components/FullInput.tsx";
import {ChangeEvent} from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from "@mui/material/Grid";
import {Box} from "@mui/material";
import {containerSx} from'./ToDoListItem.styles.ts'
import{getListItemSx} from'./ToDoListItem.styles.ts'
type ToDoProps = {
    toDoList: toDotype
    tasks: Task[]
    removeTask: (id: string, tdId: string) => void
    changeFilter: (value: FilterValue, tdId: string) => void
    addTask: (value: string, tdId: string) => void
    onChangeStatus: (itemId: string, value: boolean, tdId: string) => void
    id: string
    removeList: (tdId: string) => void
    changeToDoTitle: (id: string, title: string) => void
    changeTaskTitle: (id: string, toDoId: string, title: string) => void
}

export const ToDoListItem = ({
                                 tasks,
                                 removeTask,
                                 changeFilter,
                                 addTask,
                                 onChangeStatus,
                                 toDoList: {title, filter,},
                                 id,
                                 removeList,
                                 changeTaskTitle,
                                 changeToDoTitle
                             }: ToDoProps) => {
    const removeToDoListHandler = () => {
        removeList(id)
    }
    const addTaskHandler = (value: string) => {
        addTask(value, id)
    }
    const changeToDoTitleHandler = (title: string) => {
        changeToDoTitle(id, title)
    }
    return (
        <Grid container flexDirection={'column'} width={'250px'}>
            <Grid container spacing={2} justifyContent={'space-around'} alignItems={'center'}>
                <EditableSpan
                    fontsize={'24px'}
                    title={title}
                    changeTitle={changeToDoTitleHandler}/>
                <IconButton onClick={removeToDoListHandler} aria-label="delete" color={'error'}>
                    <DeleteIcon/>
                </IconButton>

            </Grid>

            <FullInput addTask={addTaskHandler}/>
            {tasks.length === 0 ? <p>Тасок нет</p> : <List sx={{
                flex:'1'
            }}>
                {tasks.map((task) => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, id)
                    }
                    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        onChangeStatus(task.id, e.currentTarget.checked, id)
                    }
                    const changeTaskHandler = (title: string) => {
                        changeTaskTitle(task.id, id, title)
                    }
                    return <ListItem
                        key={task.id}
                        sx={getListItemSx(task.isDone)}>

                        <div>
                            <Checkbox color={task.isDone ? 'success' : 'error'}
                                      onChange={onStatusChangeHandler}
                                      checked={task.isDone}
                                      sx={{
                                          color: '#e57373',
                                      }}
                            />
                            <EditableSpan
                                title={task.title}
                                key={task.id}
                                isDone={task.isDone}
                                changeTitle={changeTaskHandler}/>
                        </div>
                        <IconButton
                            color={!task.isDone ? 'error' : 'inherit'}
                            onClick={removeTaskHandler}
                            aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>;
                })}
            </List>}
            <Box sx={containerSx}>
                <Button variant={filter === 'ALL' ? 'contained' : 'text'} color={'primary'} onClick={() => changeFilter('ALL', id)}
                >All</Button>
                <Button variant={filter === 'Active' ? 'contained' : 'text'} color={'secondary'}
                        onClick={() => changeFilter('Active', id)}>Active</Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'text'} color={'success'}
                        onClick={() => changeFilter('Completed', id)} >Completed</Button>
            </Box>
        </Grid>
    );
};

