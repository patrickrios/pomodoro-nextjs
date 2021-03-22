

//import Counters from "../components/CounterWrapper";
//import styles from '../styles/pages/Home.module.css'

import { useContext } from "react"
import { AppContext } from "../providers/AppProvider"


export default function Homepage(){
    const {loadCountdown} = useContext(AppContext)
    return(
        <div>
            <h1>Homepage</h1>
            <button type="button" onClick={loadCountdown}> Countdown </button>
        </div>
    )
}

/**
 * 
 * <div className={styles.container}>
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

*/