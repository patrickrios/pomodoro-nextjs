import { useContext, useEffect, useState } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'
import  styles from '../styles/components/CountDown.module.css'


export default function CountDown(){

    // Inicializar:
    //Renderizar os controles da etapa

    //Ao finalizar o contador (chegar a zero)
    //Tocar alarme e notificação
    //Inicializar e renderizar o próximo contador
    //Se o step for 2,

    const {work, pause, isPause, session, currentSession} = useContext(PomodoroContext)

    /** Tempo */
    const[timing, setTime] = useState( (isPause) ? pause : work )

    let minutes = Math.floor( (timing*60) /60 )
    let seconds = (timing*60) % 60

    const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
    const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')

    /** Controla execução */
    const [isPlaying, setPlay] = useState(false)
    const [playIcon,  setIcon] = useState('/icons/play.svg')

    function startCountDown(){
        setPlay( !isPlaying )
    }

    /** Toggle play icon */
    useEffect( ()=>{
        (isPlaying) ? setIcon('/icons/pause.svg') : setIcon('/icons/play.svg')
    },[isPlaying])


    useEffect( ()=>{
        if( isPlaying){ 
            setTimeout(() => {
                setTime(timing-1)
            }, 1000)
        }
    }, [isPlaying, timing])

    return(
        <div className={styles.CountDown}>
            <strong className={`${styles.CountValue} default-item`}>
                {`${minLeft}${minRight}:${secLeft}${secRight}`}
            </strong>
            <div>
                <h3 className={styles.title}>
                    { (isPause) ? 'Pausa' : 'Trabalho' }
                </h3>
                <div>
                    <span className={styles.roundCount}></span>
                    <span className={styles.roundCount}></span>
                    <span className={styles.roundCount}></span>
                </div>
                <button 
                    onClick={startCountDown}
                    type="button"
                    className={`${styles.playButton} default-item`}
                > 
                    <img src={playIcon} alt="Playing"/>
                </button>
            </div>
        </div>
    )
}