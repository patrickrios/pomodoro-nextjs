import  styles from '../styles/pages/Continue.module.css'
import CountDown from '../components/CountDown'
import { useContext } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'


export default function Continue(){
    const {backgroundStyle} = useContext( PomodoroContext )
    return(
        <div className={backgroundStyle}>
            <div className={`${styles.continueContainer} center-container`}>
                <header>
                    <h1>Pomodoro</h1>
                    <a href="/" className="default-item">Início</a>
                </header>
                <section>
                    <CountDown />
                </section>
            </div>
        </div>
    )
}