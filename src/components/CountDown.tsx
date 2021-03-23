import { ReactNode, useContext, useEffect, useState } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'
import  styles from '../styles/components/CountDown.module.css'
import {RoundDisabled, RoundGreen, RoundYellow} from '../components/Rounds'

let countdownTimeout: NodeJS.Timeout

export default function CountDown(){

    //Ao finalizar o contador (chegar a zero)
    //Tocar alarme e notificação
    // se for pausa (isPause)
    //    * incrementar sessão atual
    //    * se sessao atual for igual a sessão
    //    * 
    //Se o step for 2,

    const {work, pause, isPause, session, currentSession} = useContext(PomodoroContext)

    /** Tempo */
    const[time, setTime] = useState( 0.8 * 10 )//((isPause) ? pause : work)*60 )

    let minutes = Math.floor( time /60 )
    let seconds = time % 60

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
        if( isPlaying && time > 0 ){ 
            countdownTimeout = setTimeout(() => {
                setTime(time-1)
            }, 1000)
        }
        else if(isPlaying && time === 0){
            new Audio('/alarm.mp3').play()
            if(Notification.permission === 'granted'){
                new Notification( `Concluido`, {
                    body: `Inicie um novo ciclo`
                })
            }
        }
    }, [isPlaying, time])

    const [progress, setProgress] = useState( loadProgress() )

    function loadProgress(){
        let prog = Array()
        loadEnableRound(prog)
        loadDisabledRound(prog)
        return prog
    }

    function loadEnableRound(rounds: Array<ReactNode>){
        for( let i=0; i<currentSession; i++)
            rounds[i] = (isPause) ? <RoundYellow /> : <RoundGreen />
    }

    function loadDisabledRound(rounds: Array<ReactNode>){
        for( let i=currentSession; i<session; i++)
            rounds[i] = <RoundDisabled />
    }

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
                    { progress }
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