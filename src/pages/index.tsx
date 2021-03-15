import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Counter from '../components/Counter'

interface CounterProps{
  value: number;
  title: string;
}

export default function Home() {

  return (
    <div>
      <Head>
        <title>Pomodoro | DevChallange</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/> 
      </Head>
      <main className={styles.container}>
        <h1>Pomodoro</h1>

        <section className={styles.countersSection}>
          <Counter value={25} title="Trabalho" />
          <Counter value={5} title="Pausa" />
          <Counter value={3} title="Sessões" />
        </section>

        <button type="button" className={styles.buttonContinue}>
          Continuar
        </button>
      </main>
    </div>
  )
}
