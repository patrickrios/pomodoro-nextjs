import { useContext } from "react"
import { AppContext } from "../providers/AppProvider"

import Counters from "../components/CounterWrapper";
import styles from '../styles/pages/Home.module.css'

export default function Homepage(){
    const {loadCountdown} = useContext(AppContext)
    return(
      <div className={styles.container}>
          <h1>
            Pomodoro
          </h1>

          <Counters style={styles.countersSection} />

          <button type="button" onClick={loadCountdown} className={styles.buttonContinue}>
            Continuar
            <img src="./icons/play-fill.svg" alt="Continuar"/>
          </button>
      </div>
    )
}