import '../styles/globals.css'
import { PomodoroProvider } from '../providers/PomodoroProvider'
import AppProvider from '../providers/AppProvider'


function MyApp({ Component, pageProps }) {
  return  (
    <PomodoroProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </PomodoroProvider>
  )
}

export default MyApp
