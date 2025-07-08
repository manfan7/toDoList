import { ChangeEvent, useState, KeyboardEvent } from "react"
import { Grid, TextField } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import AddAlarmOutlinedIcon from "@mui/icons-material/AddAlarmOutlined"

type FullInput = {
  addTask: (value: string) => void
  addTaskTitle?: boolean
  disabled?: boolean
}
export const FullInput = ({ addTask, addTaskTitle, disabled = false }: FullInput) => {
  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setInputValue(e.currentTarget.value)
    if (e.currentTarget.value.length > 150) {
      setError("Max length is 10")
    }
  }
  const addTaskHandler = () => {
    if (inputValue.trim() !== "") {
      addTask(inputValue.trim())
      setInputValue("")
    } else {
      setError("Title is required")
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setError("")
    if (e.key === "Enter" && e.ctrlKey && inputValue.length <= 10) {
      addTaskHandler()
    }
  }

  return (
    <Grid container flex={1} spacing={2} alignItems={"start"}>
      <TextField
        sx={{
          "& .MuiInputBase-input": {
            // Стили для input элемента
            fontSize: "16px", // Размер шрифта
            fontFamily: "Arial", // Шрифт
            fontWeight: 600, // Жирность
            fontStyle: "italic", // Курсив
            color: "#ffffff", // Цвет текста
          },
        }}
        value={inputValue}
        disabled={disabled}
        onChange={changeHandler}
        label={addTaskTitle ? "Write your new task" : "Type something"}
        onKeyDown={onKeyDownHandler}
        variant={"standard"}
        color={"secondary"}
        error={!!error}
        helperText={error}
      />

      <IconButton
        color="secondary"
        size="small"
        onClick={addTaskHandler}
        disabled={!inputValue || inputValue.length > 150}
      >
        <AddAlarmOutlinedIcon />
      </IconButton>
    </Grid>
  )
}
