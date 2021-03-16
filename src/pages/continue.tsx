import  styles from '../styles/pages/Continue.module.css'

export default function Continue(){
    return(
        <div className={`${styles.continueContainer} center-container`}>
            <header>
                <h1>Pomodoro</h1>
                <a href="/" className="default-item">Início</a>
            </header>
            <section>
                <strong className={`${styles.CountValue} default-item`}>25:00</strong>
                <div>
                    <h3 className={styles.round1}>Trabalho</h3>
                    <div>
                        <span className={`${styles.roundCount} ${styles.roundMark}`}></span>
                        <span className={`${styles.roundCount} ${styles.roundMark}`}></span>
                        <span className={styles.roundCount}></span>
                    </div>
                    <button type="button" className="default-item"> 
                        start 
                    </button>
                </div>
            </section>
        </div>
    )
}