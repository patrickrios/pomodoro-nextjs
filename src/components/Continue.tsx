import  styles from '../styles/pages/Continue.module.css'
import CountDown from '../components/CountDown'
import { useContext } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'
import { AppContext } from '../providers/AppProvider'

export default function Continue(){
    const { loadHome } = useContext( AppContext )
    return(
        <div>
            <div className={`${styles.continueContainer} center-container`}>
                <header>
                    <h1>Pomodoro</h1>
                    <button onClick={loadHome} className="default-item">Início</button>
                </header>
                <section>
                    <CountDown />
                </section>
            </div>
        </div>
    )
}