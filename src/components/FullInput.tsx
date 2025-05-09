import {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Grid, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddAlarmOutlinedIcon from '@mui/icons-material/AddAlarmOutlined';

type FullInput = {
    addTask: (value: string) => void
addTaskTitle?:boolean
}
export const FullInput = ({addTask,addTaskTitle}: FullInput) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        if (e.currentTarget.value.length > 15) {
            setError('Max length is 10')
        }

    }
    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is required')
        }

    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter' && e.ctrlKey && inputValue.length <= 10) {
            addTaskHandler()
        }

    }

    return (
        <Grid container spacing={2} >

            <TextField value={inputValue}
                       onChange={changeHandler}
                       label={addTaskTitle ? 'Write your new task': 'Type something'}
                       onKeyDown={onKeyDownHandler}
                       variant={'standard'}
                       color={'secondary'}
                       error={!!error}
                       helperText={error}
            />


            <IconButton
                color='secondary'
                size='small'
                onClick={addTaskHandler}
                disabled={!inputValue || inputValue.length > 15}
            ><AddAlarmOutlinedIcon/></IconButton>

        </Grid>
    );
};

