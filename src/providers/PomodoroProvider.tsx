import { createContext, ReactNode, useState } from "react";


interface PomodoroContextData{
    work: number;
    pause: number;
    session: number;
    increaseWork: () => void;
    decreaseWork: () => void;
    increasePause: () => void;
    decreasePause: () => void;
    increaseSession: () => void;
    decreaseSession: () => void;
}

interface PomodoroProviderProps{
    children: ReactNode;
}

export const PomodoroContext = createContext({} as PomodoroContextData)

export function PomodoroProvider( {children} : PomodoroProviderProps ){

    const [work, setWork] = useState(26)
    const [pause, setPause] = useState(8)
    const [session, setSession] = useState(15)

    function increaseWork() {
        setWork( work + 1)
    }
    function decreaseWork(){
        setWork(work -1 )
    }

    function increasePause(){
        setPause( pause + 1)
    }
    function decreasePause(){
        setPause ( pause -1)
    }

    function increaseSession(){
        setSession( session - 1)
    }
    function decreaseSession(){
        setSession( session -1 )
    }

    return(
        <PomodoroContext.Provider 
            value={{
                work, 
                pause, 
                session,
                increaseWork,
                decreaseWork,
                increasePause,
                decreasePause,
                increaseSession,
                decreaseSession
            }}>
            {children}
        </PomodoroContext.Provider>
    )
}