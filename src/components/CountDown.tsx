import { useContext } from 'react'
import { CountDownContext } from '../providers/CountDownProvider'
import  styles from '../styles/components/CountDown.module.css'


export default function CountDown(){
  
    const {
        minLeft,
        minRight,
        secLeft,
        secRight,
        title,
        sessionProgress,
        playIcon,
        startCountDown
    } = useContext(CountDownContext)
    
    return(
        <div className={styles.CountDown}>
            <strong className={`${styles.CountValue} default-item`}>
                {`${minLeft}${minRight}:${secLeft}${secRight}`}
            </strong>
            <div>
                <h3 className={styles.title}>
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