import { useEffect, useState } from 'react'
import  styles from '../styles/components/CountDown.module.css'

export default function CountDown(){

    const [isPlaying, setPlay] = useState(false)
    const [playIcon, setIcon] = useState('/icons/play.svg')

    function togglePlay(){
        setPlay( !isPlaying )
    }

    useEffect( ()=>{
        if(isPlaying){
            setIcon('/icons/pause.svg')
        }else{
            setIcon('/icons/play.svg')
        }
    }, [isPlaying])

    return(
        <div className={styles.CountDown}>
            <strong className={`${styles.CountValue} default-item`}>25:00</strong>
            <div>
                <h3 className={styles.titleGreen}>
                    Trabalho
                </h3>
                <div>
                    <span className={`${styles.roundCount} ${styles.roundGreen}`}></span>
                    <span className={`${styles.roundCount} ${styles.roundGreen}`}></span>
                    <span className={styles.roundCount}></span>
                </div>
                <button onClick={togglePlay} type="button" className={`${styles.playButton} default-item`}> 
                    <img src={playIcon} alt="Playing"/>
                </button>
            </div>
        </div>
    )
}