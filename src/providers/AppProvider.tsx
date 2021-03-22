import { createContext, ReactNode, useEffect, useState } from "react";
import Continue from "../components/Continue";
import Homepage from "../components/Homepage";

interface AppContextData{
    content: ReactNode;
    loadHome: () => void;
    loadCountdown: ()=> void;

}

interface AppProviderProps{
    children: ReactNode;
}

export const AppContext = createContext({} as AppContextData)

export default function AppProvider( {children}: AppProviderProps){

    const [content, setContent] = useState(<Homepage/>)

    function loadHome(){
        setContent(<Homepage/>)
    }

    function loadCountdown(){
        setContent(<Continue/>)
    }

    return(
        <AppContext.Provider 
            value={{
                content,
                loadHome,
                loadCountdown
            }}
        >
            {children}
        </AppContext.Provider>
    )
}