import { ChangeEvent, useState } from "react"
type ToDoListTitle = {
  title: string
  setInputValue: (title: string) => void
}

export const EditableSpan = ({ title, setInputValue }: ToDoListTitle) => {
  const [editMode, setEditMode] = useState(false)
  const [inputTitle, setInputTitle] = useState("")
  const activateEditMode = () => {
    setEditMode(!editMode)
    setInputTitle(title)
    if (inputTitle.trim() !== "") {
      setInputValue(inputTitle)
    }
  }
  const setCurrentTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.currentTarget.value)
  }
  return editMode ? (
    <input
      onBlur={activateEditMode}
      onDoubleClick={activateEditMode}
      value={inputTitle}
      onChange={setCurrentTitleHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  )
}
