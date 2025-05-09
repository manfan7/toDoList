import React, {useState, KeyboardEvent} from 'react';
import styles from './Select.module.css'

export type itemType = {
    title: string
    value: any
}
export type Props = {
    value?: any
    onchange: (value: any) => void
    items: itemType[]
}
export const Select = (props: Props): React.JSX.Element => {

    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(props.value)
    let selectedItem = props.items.find(i => i.value === props.value)
    const handleActive = () => {
        setActive(!active)
    }
    const toggleClick = (value: any) => {
        props.onchange(value)
        handleActive()
    }

    const onkeydown = (e: KeyboardEvent<HTMLDivElement>) => {

        switch (e.key) {
            case 'ArrowUp': {
                const currentIndex = props.items.findIndex(item => item.value === hovered);
                const prevIndex = currentIndex <= 0 ? props.items.length - 1 : currentIndex - 1;
                setHovered(props.items[prevIndex].value);
                props.onchange(props.items[prevIndex].value)
                break;
            }
            case 'ArrowDown': {
                const currentIndex = props.items.findIndex(item => item.value === hovered);
                const nextIndex = currentIndex >= props.items.length - 1 ? 0 : currentIndex + 1;
                setHovered(props.items[nextIndex].value);
                props.onchange(props.items[nextIndex].value)
                break;
            }
            default:
                break;
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            toggleClick(hovered)
        }

    }
    console.log('select')
    return (
        <div className={styles.select} >
            <h3 className={styles.main} onClick={handleActive}>{selectedItem && selectedItem.title}</h3>

            {active &&
                <div className={styles.items} tabIndex={0} onKeyDown={onkeydown} >
                    {props.items.map(item => {
                        return (
                            <div
                                onMouseEnter={() => setHovered(item.value)}
                                className={`${styles.item} ${hovered === item.value ? styles.selected : ''} `}
                                key={item.title} onClick={() => toggleClick(item.value)}>{item.title}</div>
                        )
                    })}
                </div>
            }
            {props.items.map(item=><div>{item.title}</div>)}
        </div>

    );
};

