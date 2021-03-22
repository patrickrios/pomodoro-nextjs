import styles from '../styles/components/Counter.module.css'

interface CounterProps{
    value: number;
    title: string;
    increase: () => void;
    decrease: () => void;
}

export default function Counter({value, title, increase, decrease}:CounterProps){

    return(
        <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" onClick={increase} alt="Incrementar"/>
              <img src="./icons/down.svg" onClick={decrease} alt="Incrementar"/>
            </div>
            <div>
              <strong>{value}</strong>
              <h2>{title}</h2>
            </div>
        </div>
    )
}