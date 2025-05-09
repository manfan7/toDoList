import {SxProps} from '@mui/material'

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    alignSelf:'flex-end',
    width:'100%'
}
export const getListItemSx = (isDone: boolean): SxProps => (
    {
        p: 0,
        justifyContent: 'space-between',
        opacity: isDone ? 0.5 : 1,
        flex: 1
    }
)