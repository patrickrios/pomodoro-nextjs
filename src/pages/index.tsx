import Head from 'next/head'
import { PomodoroContext} from '../providers/PomodoroProvider'
import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'

export default function Home() {

  const {content, backgroundColor} = useContext(AppContext)

  return (
    <div className={backgroundColor}>
        <Head>
          <title>Pomodoro | DevChallange</title>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"/> 
        </Head>
        <main>
            {content}
        </main>
    </div>
  )
}
