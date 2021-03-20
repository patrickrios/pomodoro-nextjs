import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import Counter from '../components/Counter'
import { PomodoroProvider} from '../providers/PomodoroProvider'
import Counters from '../components/Counters'

export default function Home() {

  interface CountersProps{
    style: string;
}


  return (
    <PomodoroProvider>
        <Head>
          <title>Pomodoro | DevChallange</title>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/> 
        </Head>
        <main className={styles.container}>
          <h1>
            <img src="./icons/clock.svg" alt="Pomodoro clock"/>
            Pomodoro
          </h1>

         <Counters style={styles.countersSection} />

          <a href="/continue" className={styles.buttonContinue}>
            Continuar
            <img src="./icons/play-fill.svg" alt="Continuar"/>
          </a>
        </main>
    </PomodoroProvider>
  )
}
