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
    greenBG: () => void;
}

interface PomodoroProviderProps{
    children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextData)

export function PomodoroProvider( {children} : PomodoroProviderProps ){

    const [work, setWork] = useState( recover('work') || 25)
    const [pause, setPause] = useState(recover('pause') || 5)
    const [session, setSession] = useState( recover('session') || 3)
    const [currentSession, setCurrentSession] = useState(1)
    const [isPause, setIsPause] = useState(false)
    const [backgroundStyle, setBackground] = useState("defaultBG")

    /** Values controllers */
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

    /** Storing datas */
    useEffect( ()=>{
        Cookie.set('work', String(work))
        Cookie.set('pause', String(pause))
        Cookie.set('session', String(session))
    }, [work, pause, session])

    function recover(key: string){
        return Number(Cookie.get(key))
    }

    /** Styles controller */
    function greenBG(){
        setBackground("greenBG")
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
                greenBG
            }}>
            {children}
        </PomodoroContext.Provider>
    )
}