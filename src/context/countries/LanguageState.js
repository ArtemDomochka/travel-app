import React, { createContext, useEffect, useState } from "react"

export const LanguageContext = createContext()

export const LanguageState = ({children}) =>{
    const [lang, setLang] = useState('en')

    useEffect(()=>{
        setLang(localStorage.getItem('lang')?localStorage.getItem('lang'):'en')
    },[])

    useEffect(()=>{
        localStorage.setItem('lang', lang)
    },[lang])

    return(
        <LanguageContext.Provider value={{lang, setLang}}>
            {children}
        </LanguageContext.Provider>
    )
}