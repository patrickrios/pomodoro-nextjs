import Head from 'next/head'
import styles from '../styles/Home.module.css'

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
          <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" alt="Incrementar"/>
              <img src="./icons/down.svg" alt="Incrementar"/>
            </div>
            <div>
              <strong>25</strong>
              <h2>Trabalho</h2>
            </div>
          </div>

          <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" alt="Incrementar"/>
              <img src="./icons/down.svg" alt="Incrementar"/>
            </div>
            <div>
              <strong>5</strong>
              <h2>Pausa</h2>
            </div>
          </div>

          <div className={styles.counter}>
            <div>
              <img src="./icons/up.svg" alt="Incrementar"/>
              <img src="./icons/down.svg" alt="Incrementar"/>
            </div>
            <div>
              <strong>3</strong>
              <h2>Sessões</h2>
            </div>
          </div>

        </section>

        <button type="button" className={styles.buttonContinue}>
          Continuar
        </button>
      </main>
    </div>
  )
}
