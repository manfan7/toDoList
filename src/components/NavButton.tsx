import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
type Props ={
    background?:string
}


export const NavButton = styled(Button)(({background}:Props)=>({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px 0px, rgba(0, 0, 0, 0.22) 0px 10px 10px 0px',
    borderRadius: '8px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: background ||'inherit',
}))