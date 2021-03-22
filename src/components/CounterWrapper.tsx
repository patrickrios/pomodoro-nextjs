import { useContext } from "react"
import { PomodoroContext } from "../providers/PomodoroProvider"
import Counter from "./Counter"


interface CountersProps{
    style: string;
}

export default function Counters({style}:CountersProps){

    const {
        work, increaseWork, decreaseWork,
        pause, increasePause, decreasePause,
        session, increaseSession, decreaseSession
    } = useContext(PomodoroContext)

    return(
        <section className={`${style} center-container`}>
            <Counter 
                value={work}
                title="Trabalho"
                increase={increaseWork} 
                decrease={decreaseWork}
            />
            <Counter 
                value={pause}
                title="Pausa"
                increase={increasePause}
                decrease={decreasePause}
            />
            <Counter 
                value={session}
                title="Sessões"
                increase={increaseSession} 
                decrease={decreaseSession}
            />
      </section>
    )
}