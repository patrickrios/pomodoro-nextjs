import { createContext, ReactNode, useEffect, useState } from "react";
import Cookie from 'js-cookie'

interface PomodoroContextData{
    work: number;
    pause: number;
    session: number;
    currentSession: number;
    isPause: boolean;
    backgroundStyle: string;
    increaseWork: () => void;
    decreaseWork: () => void;
    increasePause: () => void;
    decreasePause: () => void;
    increaseSession: () => void;
    decreaseSession: () => void;
    increaseCurrentSession: () => void;
    defineAsPause: () => void;
}

interface PomodoroProviderProps{
    children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextData)

const MIN_WORK  = 25
const MIN_PAUSE = 5
const MIN_SESSION = 3

export function PomodoroProvider( {children} : PomodoroProviderProps ){

    const [work, setWork] = useState( recover('work') || MIN_WORK)
    const [pause, setPause] = useState(recover('pause') || MIN_PAUSE)
    const [session, setSession] = useState( recover('session') || MIN_SESSION)
    const [currentSession, setCurrentSession] = useState(1)
    const [isPause, definePause] = useState(false)
    const [backgroundStyle, setBackground] = useState("defaultBG")

    /** Control values */
    function increaseWork() {
        setWork( work + 1)
    }

    function decreaseWork(){
        (work > 1) && setWork(work-1)
    }

    function increasePause(){
        setPause( pause + 1)
    }

    function decreasePause(){
        (pause > 1) && setPause (pause-1)
    }

    function increaseSession(){
        setSession( session + 1)
    }

    function decreaseSession(){
        (session > 1) && setSession(session-1)
    }

    const defineAsPause = () => {
        definePause( !isPause )
    }

    const increaseCurrentSession = () =>{
        setCurrentSession( currentSession + 1)
    }

    /** Storing datas */
    useEffect( ()=>{
        Cookie.set('work', String(work))
        Cookie.set('pause', String(pause))
        Cookie.set('session', String(session))
    }, [work, pause, session])

    function recover(key: string){
        return Number(Cookie.get(key))
    }

    return(
        <PomodoroContext.Provider 
            value={{
                work, 
                pause, 
                session,
                currentSession,
                isPause,
                backgroundStyle,
                increaseWork,
                decreaseWork,
                increasePause,
                decreasePause,
                increaseSession,
                decreaseSession,
                increaseCurrentSession,
                defineAsPause
            }}>
            {children}
        </PomodoroContext.Provider>
    )
}