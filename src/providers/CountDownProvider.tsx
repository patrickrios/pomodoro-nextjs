import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { RoundDisabled, RoundGreen, RoundYellow } from "../components/Rounds";
import { AppContext } from "./AppProvider";
import { PomodoroContext } from "./PomodoroProvider";

interface CountDownDatas{
    isPlaying: boolean;
    title: string;
    sessionProgress: object;
    playIcon: string;
    stepColor: string;
    circleColor: string;
    time: number;
    startCountDown: () =>void;
    countDownComplete: () => void;
}
interface CountDownProps{
    children: ReactNode;
}
export const CountDownContext = createContext({} as CountDownDatas)

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


    const Datas = {
        getTime(){
            return ((isPause) ? pause : work)*60
        },
        getStepColor(){
            return (isPause) ? 'yellowText' : 'greenText'
        },
        getCircleColor(){
            return (isPause) ? '#F2C94C' : '#219653'
        },
        getCompleteMessage(){
            return isPause 
                ? ['Ao Trabalho!', 'Foque na sua tarefa para finalizá-la.'] 
                : ['Bom trabalho!', 'Agora descanse um pouco.']
        }
    }
    const[time, setTime] = useState( Datas.getTime() )


    /** Controla o cronômetro */
    const CountDown = {
        setTitle(){
            return (isPause) ? 'Pausa' : 'Trabalho'
        },
        start(){
            startPlaying( (prevState) => !prevState )
        },
        reset(){
            setStepColor( Datas.getStepColor() )
            setCircleColor( Datas.getCircleColor() )
            setTime( Datas.getTime() )
            setTitle( this.setTitle() )
            setProgress( Progress.render() )
            startPlaying( false )
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
        notify(){
            new Audio('/alarm.mp3').play()
            if(Notification.permission === 'granted'){
                let message = Datas.getCompleteMessage()
                new Notification( message[0], {
                    body: message[1]
                })
            }
        }
    }
    
    /** Controla execução */
    const [isPlaying, startPlaying] = useState(false)
    const [playIcon,  setIcon] = useState('/icons/play.svg')
    const [title, setTitle]    = useState( CountDown.setTitle() )
    const [stepColor, setStepColor] = useState( Datas.getStepColor() )
    const [circleColor, setCircleColor] = useState( Datas.getCircleColor() )
    const startCountDown = CountDown.start


    /* Controla o ícone do play */
    useEffect( ()=>{
        (isPlaying) 
            ? setIcon('/icons/pause.svg') 
            : setIcon('/icons/play.svg')
    },[isPlaying])


    /* Controla a etapa */
    useEffect( ()=>{
        CountDown.reset()
        if( isPause){
            increaseCurrentSession()
        } 
    }, [isPause])


    const countDownComplete = () => {
        CountDown.done()
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
                isPlaying,
                title,
                sessionProgress,
                playIcon,
                stepColor,
                circleColor,
                time,
                startCountDown,
                countDownComplete
            }}
        >
            {children}
        </CountDownContext.Provider>
    )
}