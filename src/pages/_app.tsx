import '../styles/globals.css'
import { PomodoroContext, PomodoroProvider } from '../providers/PomodoroProvider'

function MyApp({ Component, pageProps }) {
  return  (
    <PomodoroProvider>
      <Component {...pageProps} />
    </PomodoroProvider>
  )
}

export default MyApp
