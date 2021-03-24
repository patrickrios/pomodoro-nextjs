import  styles from '../styles/pages/Continue.module.css'
import CountDown from '../components/CountDown'
import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'
import CountDownProvider from '../providers/CountDownProvider'

export default function Continue(){
    const { loadHome } = useContext( AppContext )
    return(
        <div>
            <div className={`${styles.continueContainer} center-container`}>
                <header>
                    <h1>Pomodoro</h1>
                    <a 
                        onClick={loadHome} 
                        className={`${styles.homeButton} default-item`}
                    >
                        Início</a>
                </header>
                <section>
                    <CountDownProvider>
                        <CountDown />
                    </CountDownProvider>
                </section>
            </div>
        </div>
    )
}