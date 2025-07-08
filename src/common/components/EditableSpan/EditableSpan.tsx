import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles"

type EditableSpan = {
  title: string
  isDone?: boolean
  fontsize?: string
  changeTitle: (title: string) => void
  disabled: boolean
}

export const EditableSpan = ({ title, isDone, changeTitle, fontsize, disabled }: EditableSpan) => {
  const [edirMode, setEditMode] = useState(false)
  const [initValue, setInitValue] = useState("")

  const changeInitValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setInitValue(e.currentTarget.value)
  }
  const modeControlHandler = () => {
    if (!isDone || !disabled) {
      setEditMode(true)
      setInitValue(title)
    }
  }
  const onBlurEditMode = () => {
    setEditMode(false)
    if (initValue.trim() !== "") {
      changeTitle(initValue)
    }
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === "Enter" && e.ctrlKey && initValue.trim() !== "") {
      changeTitle(initValue)
      setEditMode(false)
    }
  }
  return edirMode ? (
    <TextField
      autoFocus={true}
      onChange={changeInitValue}
      value={initValue}
      onBlur={onBlurEditMode}
      onKeyDown={onKeyDownHandler}
      variant="standard"
    />
  ) : (
    <StyledSpan fontsize={fontsize} onDoubleClick={modeControlHandler}>
      {title.slice(0, 20)}
    </StyledSpan>
  )
}
type Props = {
  fontsize?: string
}
const StyledSpan = styled("span")(({ fontsize }: Props) => ({
  fontWeight: fontsize ? "bold" : "normal",
  fontSize: fontsize || "16px",
  textOverflow: "ellipsis",
  width: "75%",
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: "100%",
}))
