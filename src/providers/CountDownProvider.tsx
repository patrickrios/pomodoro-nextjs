import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RoundDisabled, RoundGreen, RoundYellow } from "../components/Rounds";
import { AppContext } from "./AppProvider";
import { PomodoroContext } from "./PomodoroProvider";

interface CountDownDatas{
    minLeft: string;
    minRight: string;
    secLeft: string;
    secRight: string;
    title: string;
    sessionProgress: object;
    playIcon: string;
    startCountDown: () =>void;
}
interface CountDownProps{
    children: ReactNode;
}
export const CountDownContext = createContext({} as CountDownDatas)

let countdownTimeout: NodeJS.Timeout

export default function CountDownProvider( {children}: CountDownProps){
    const {
        work, 
        pause, 
        isPause, 
        session, 
        currentSession, 
        increaseCurrentSession,
        nextStep,
        pomodoroHasFinished,
        resetPomodoro,
    } = useContext(PomodoroContext)

    const { loadHome } = useContext(AppContext)


    /** Tempo */
    const[time, setTime] = useState( initTime() )
    
    let minutes = Math.floor( time/60 )
    let seconds = time % 60

    const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
    const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')

    function initTime(){
        return ((isPause) ? pause : work)*60
    }

    /** Controla o cronômetro */
    const CountDown = {
        setTitle(){
            return (isPause) ? 'Pausa' : 'Trabalho'
        },
        start(){
            startPlaying( (prevState) => !prevState )
        },
        reset(){    
            clearTimeout(countdownTimeout)
            setTime( initTime() )
            setTitle( this.initTitle() )
            setProgress( Progress.render() )
            startPlaying( (prevState) => !prevState )
        },
        done(){
            nextStep()
            this.notify()
            if( pomodoroHasFinished() ){
                resetPomodoro()
                loadHome()
            }
        },
        isCounting(){
            return isPlaying && time > 0
        },
        isFinished(){
            return isPlaying && time === 0
        },
        descrease(){
            countdownTimeout = setTimeout( 
                () => {
                    setTime( (prevState) => prevState-1)
                }, 1000
            )
        },
        notify(){
            new Audio('/alarm.mp3').play()
                if(Notification.permission === 'granted'){
                    new Notification( `Concluido`, {
                        body: `Inicie um novo ciclo`
                })
            }
        }
    }
    
    /** Controla execução */
    const [isPlaying, startPlaying] = useState(true)
    const [playIcon,  setIcon] = useState('/icons/play.svg')
    const [title, setTitle]    = useState( CountDown.setTitle() )
    const startCountDown = CountDown.start

    
    useEffect( ()=>{
        (isPlaying) ? setIcon('/icons/pause.svg') : setIcon('/icons/play.svg')
    },[isPlaying])


    useEffect( ()=> {
        if( CountDown.isCounting()){ 
            CountDown.descrease()
        }
        else if( CountDown.isFinished()){
            CountDown.done()
        }
    }, [isPlaying, time])


    useEffect( ()=> {
        CountDown.reset()
        if( isPause ){
            increaseCurrentSession()
        }
    },[isPause])


    /** Progresso */
    const Progress = {
        rounds: Array(),
        render(){
           this.loadEnableRound(this.rounds)
           return this.loadDisabledRound(this.rounds)
       },
        loadEnableRound(){
           for( let i=0; i<currentSession; i++)
               this.rounds[i] =  (isPause) ? <RoundYellow/> : <RoundGreen/>
       },
        loadDisabledRound(){
           for( let i=currentSession; i<session; i++)
               this.rounds[i] = <RoundDisabled/>
           return this.rounds
       }
    }
    const [sessionProgress, setProgress] = useState( Progress.render() )

    return(
        <CountDownContext.Provider 
            value={{
                minLeft,
                minRight,
                secLeft,
                secRight,
                title,
                sessionProgress,
                playIcon,
                startCountDown
            }}
        >
            {children}
        </CountDownContext.Provider>
    )
}