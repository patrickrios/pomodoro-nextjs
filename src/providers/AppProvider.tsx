import { createContext, ReactNode, useState } from "react";
import Continue from "../components/Continue";
import Homepage from "../components/Homepage";

interface AppContextData{
    content: ReactNode;
    backgroundColor: string;
    loadHome: () => void;
    loadCountdown: ()=> void;
    defaultBG: ()=>void;
}
interface AppProviderProps{
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)

export default function AppProvider( {children}: AppProviderProps){

    const [content, setContent] = useState(<Homepage/>)
    const [backgroundColor, setBackground] = useState("defaultBG")

    const loadHome = () =>{
        defaultBG()
        setContent(<Homepage/>)
    }
    const loadCountdown = () =>{
        setContent(<Continue/>)
    }
    const defaultBG = () =>{
        setBackground('defaultBG')
    }

    return(
        <AppContext.Provider 
            value={{
                content,
                backgroundColor,
                loadHome,
                loadCountdown,
                defaultBG
            }}
        >
            {children}
        </AppContext.Provider>
    )
}