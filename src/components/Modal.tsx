import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'
import styles from '../styles/components/Modal.module.css'

export default function Modal(){

    const {toggleModal} = useContext(AppContext)

    return(
        <div className={styles.modal}>
            <h2>Bom trabalho</h2>
            <p>Você concluiu seu pomodoro.</p>
            <button onClick={toggleModal} type="button">OK</button>
        </div>
    )
}