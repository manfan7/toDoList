import {useReducer} from "react";

type item = {
    title:string
    value:string
}

type ActionType = {
    type:string
    payload?:any
}
export type stateType = {
    collapsed:boolean
}
export const TOGGLE = 'TOGGLE'
export const reducer = (state:stateType,action:ActionType):stateType=>{
switch (action.type){
    case TOGGLE: return {...state,collapsed:!state.collapsed}
    default: return state
}

}
export const AccordionForReducer = () => {

    //const [collapsed, setCollapsed] = useReducer(v=>!v,false) можно так
    const [state, setCollapsed] = useReducer(reducer,{collapsed:false})
    const items:item[] = [
        {title: '1', value: '1'},
        {title: '2', value: '2'},
        {title: '3', value: '3'}]
    return (
        <>
            <h3 onClick={()=>setCollapsed({type: TOGGLE})}>Title</h3>
            {
                !state.collapsed && items.map(item=><div key={item.title}>{item.title}^{item.value}</div>)
            }
        </>
    )

}