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
                subtitle="Minutos"
                increase={increaseWork} 
                decrease={decreaseWork}
            />
            <Counter 
                value={pause}
                title="Pausa"
                subtitle="Minutos"
                increase={increasePause}
                decrease={decreasePause}
            />
            <Counter 
                value={session}
                title="Sessões"
                subtitle=""
                increase={increaseSession} 
                decrease={decreaseSession}
            />
      </section>
    )
}