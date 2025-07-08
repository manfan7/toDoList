type ButtonPropsType = {
  title: string
  onClick?: () => void
  className?: boolean
}

export const Button = ({ title, onClick, className }: ButtonPropsType) => {
  return (
    <button className={className ? "active-filter" : ""} onClick={onClick}>
      {title}
    </button>
  )
}
