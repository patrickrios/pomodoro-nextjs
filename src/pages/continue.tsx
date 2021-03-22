import  styles from '../styles/pages/Continue.module.css'
import CountDown from '../components/CountDown'
import { useContext } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'
import Head from 'next/head'



export default function Continue(){
    const { work, pause, isPause, backgroundStyle} = useContext( PomodoroContext )

    const title = isPause ? 'Pausa' : 'Trabalho'
    const time  = isPause ? pause : work
    return(
        <div className={backgroundStyle}>
            <Head>
                <title>{`${title} (${time})` }</title>
            </Head>
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