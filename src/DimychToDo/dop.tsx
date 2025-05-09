import React, {ButtonHTMLAttributes} from 'react';
import styles from'./SuperButton.module.css'
        type DopType1 = {
            onClick:()=>void
            color?:string
            title:string
            children:React.ReactNode
            backGround?:string
        }
type DopType = ButtonHTMLAttributes<HTMLButtonElement> & Omit<DopType1, 'onClick'|'title'>
export const Dop = (props:DopType) => {
    const{color,children,disabled} = props
    const finalClassName = `
    ${styles.button} 
    ${color==='red' ? styles.redForSuperButton : styles.blueForSuperButton}
    ${disabled ? styles.disabled : ''}`
    return (
        <button className={finalClassName}>
            {children}
        </button>
    );
};


