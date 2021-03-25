import { createContext, ReactNode, useState } from "react";
import Continue from "../components/Continue";
import Homepage from "../components/Homepage";
import Modal from "../components/Modal";

interface AppContextData{
    content: ReactNode;
    backgroundColor: string;
    modal: ReactNode;
    loadHome: () => void;
    loadCountdown: ()=> void;
    toggleModal: ()=>void;
    defaultBG: ()=>void;
}
interface AppProviderProps{
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)

export default function AppProvider( {children}: AppProviderProps){

    const [content, setContent] = useState(<Homepage/>)
    const [backgroundColor, setBackground] = useState("defaultBG")
    const [modal, setModal] = useState(null)

    const loadHome = () => setContent(<Homepage/>)

    const loadCountdown = () => setContent(<Continue/>)

    const defaultBG = () => setBackground('defaultBG')

    const toggleModal = () =>  (modal === null) ? setModal(<Modal />) : setModal(null)

    return(
        <AppContext.Provider 
            value={{
                content,
                backgroundColor,
                modal,
                loadHome,
                loadCountdown,
                toggleModal,
                defaultBG
            }}
        >
            {children}
        </AppContext.Provider>
    )
}