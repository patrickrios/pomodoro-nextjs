import { ReactNode, useContext, useEffect, useState } from 'react'
import { PomodoroContext } from '../providers/PomodoroProvider'
import  styles from '../styles/components/CountDown.module.css'
import {RoundDisabled, RoundGreen, RoundYellow} from '../components/Rounds'

let countdownTimeout: NodeJS.Timeout

export default function CountDown(){

    const {
        work, 
        pause, 
        isPause, 
        session, 
        currentSession, 
        increaseCurrentSession,
        defineAsPause
    } = useContext(PomodoroContext)


    /** Tempo */
    const[time, setTime] = useState( initTime() )//((isPause) ? pause : work)*60 )
    
    let minutes = Math.floor( time/60 )
    let seconds = time % 60

    const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
    const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')

    function initTime(){
        return 0.3 * 10 //((isPause) ? pause : work)*60 )
    }


    /** Controla execução */
    const [isPlaying, setPlay] = useState(false)
    const [playIcon,  setIcon] = useState('/icons/play.svg')
    const [title, setTitle]    = useState( initTitle() )

    function initTitle(){
        return (isPause) ? 'Pausa' : 'Trabalho'
    }

    function startCountDown(){
        setPlay( !isPlaying )
    }

    function reseCountdown(){
        defineAsPause()
        console.log( isPause )
        increaseCurrentSession()
        setTime( initTime() )
        setTitle( initTitle() )
        setProgress( Progress.render() )
        setPlay( !isPlaying )
        clearTimeout(countdownTimeout)
    }

    function hasFinished(){
        reseCountdown()
    }

    useEffect( ()=>{
        (isPlaying) ? setIcon('/icons/pause.svg') : setIcon('/icons/play.svg')
    },[isPlaying])

    useEffect( ()=>{
        if( isPlaying && time > 0 ){ 
            countdownTimeout = setTimeout( () => {
                setTime(time-1)
            }, 1000)
        }
        else if(isPlaying && time === 0){
            hasFinished()
            notify()
        }
    }, [isPlaying, time])

    function notify(){
        // incrementar session, se for isPause
        // change isPause
        // reset countdown
        new Audio('/alarm.mp3').play()
            if(Notification.permission === 'granted'){
                new Notification( `Concluido`, {
                    body: `Inicie um novo ciclo`
            })
        }
    }



    /** Progresso */
    const Progress = {
        rounds: Array(),
        render(){
           this.loadEnableRound(this.rounds)
           return this.loadDisabledRound(this.rounds)
       },
        loadEnableRound(){
           for( let i=0; i<currentSession; i++)
               this.rounds[i] = (isPause) ? <RoundYellow /> : <RoundGreen />
       },
        loadDisabledRound(){
           for( let i=currentSession; i<session; i++)
               this.rounds[i] = <RoundDisabled />
           return this.rounds
       }
    }
    const [sessionProgress, setProgress] = useState( Progress.render() )


    return(
        <div className={styles.CountDown}>
            <strong className={`${styles.CountValue} default-item`}>
                {`${minLeft}${minRight}:${secLeft}${secRight}`}
            </strong>
            <div>
                <h3 className={styles.title}>
                    { title }
                </h3>
                <div>
                    { sessionProgress }
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