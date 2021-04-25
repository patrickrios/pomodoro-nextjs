import styles from '../styles/components/Counter.module.css'

interface CounterProps{
    value: number;
    title: string;
    subtitle: string;
    increase: () => void;
    decrease: () => void;
}

export default function Counter({value, title, subtitle, increase, decrease}:CounterProps){

    return(
        <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" onClick={increase} alt="Incrementar"/>
              <img src="./icons/down.svg" onClick={decrease} alt="Incrementar"/>
            </div>
            <div>
              <div className={styles.counterValue}>
                <strong>{value}</strong>
                <p>{subtitle}</p>
              </div>
              <h2>{title}</h2>
            </div>
        </div>
    )
}