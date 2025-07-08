type ButtonProps = {
  title: string
  onClick?: () => void
  classname?: string
  disabled?: boolean
}

export const Button = ({ title, onClick, classname, disabled }: ButtonProps) => {
  return (
    <button className={classname} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  )
}
