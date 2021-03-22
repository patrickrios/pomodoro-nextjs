import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { PomodoroContext} from '../providers/PomodoroProvider'
import Counters from '../components/CounterWrapper'
import { useContext } from 'react'

export default function Home() {

  const { backgroundStyle} = useContext(PomodoroContext)

  return (
    <div className={backgroundStyle}>
        <Head>
          <title>Pomodoro | DevChallange</title>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/> 
        </Head>
        <main>
          <div className={styles.container}>
            <h1>
              <img src="./icons/clock.svg" alt="Pomodoro clock"/>
              Pomodoro
            </h1>

          <Counters style={styles.countersSection} />

            <a href="/continue" className={styles.buttonContinue}>
              Continuar
              <img src="./icons/play-fill.svg" alt="Continuar"/>
            </a>
          </div>
        </main>
    </div>
  )
}
