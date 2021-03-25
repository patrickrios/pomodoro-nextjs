import { useContext, useEffect, useState } from 'react'
import { CountDownContext } from '../providers/CountDownProvider'
import  styles from '../styles/components/CountDown.module.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


export default function CountDown(){
  
    const {
        isPlaying,
        time,
        title,
        sessionProgress,
        playIcon,
        stepColor,
        circleColor,
        startCountDown,
        countDownComplete
    } = useContext(CountDownContext)

    const children = ({ remainingTime }) => {
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60
        const [minLeft, minRight] = String(minutes).padStart(2,'0').split('')
        const [secLeft, secRight] = String(seconds).padStart(2,'0').split('')
        return `${minLeft}${minRight}:${secLeft}${secRight}`
    }

    const [key, setKey] = useState(0)

    return(
        <div className={styles.CountDown}>
            <strong className={`${styles.CountValue} default-item`}>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    key={key}
                    duration={time}
                    colors={circleColor}
                    strokeWidth={5}
                    size={240}
                    trailColor={'rgba(0,0,0,0.05)'}
                    onComplete={() => {
                        countDownComplete()
                        setKey( prevKey => prevKey+1 )
                        return [true, 0]
                    }}
                >
                    {children}
                </CountdownCircleTimer>
            </strong>
            <div>
                <h3 className={stepColor}>
                    { title }
                </h3>
                <div>
                    { sessionProgress }
                </div>
                <button 
                    onClick={startCountDown}
                    type="button"
                    className={`${styles.playButton} default-item`}
                > 
                    <img src={playIcon} alt="Playing"/>
                </button>
            </div>
        </div>
    )
}