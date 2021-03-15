import { useState } from 'react'
import styles from '../styles/components/Counter.module.css'

interface CounterProps{
    value: number;
    title: string;
}

export default function Counter({value, title}:CounterProps){

    const[count, setValue] = useState(value)

    function inscrease(){
        setValue(count+1)
    }

    function discrease(){
        if( count > 1){
            setValue( count-1 )
        }
    }

    return(
        <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" onClick={inscrease} alt="Incrementar"/>
              <img src="./icons/down.svg" onClick={discrease} alt="Incrementar"/>
            </div>
            <div>
              <strong>{count}</strong>
              <h2>{title}</h2>
            </div>
          </div>
    )
}