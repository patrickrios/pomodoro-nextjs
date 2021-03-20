import  styles from '../styles/pages/Continue.module.css'
import CountDown from '../components/CountDown'

export default function Continue(){
    return(
        <div className={`${styles.continueContainer} center-container`}>
            <header>
                <h1>Pomodoro</h1>
                <a href="/" className="default-item">Início</a>
            </header>
            <section>
                <CountDown />
            </section>
        </div>
    )
}