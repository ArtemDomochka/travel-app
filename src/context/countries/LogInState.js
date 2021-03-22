import React, { createContext, useEffect, useState } from 'react'
import LogIn from '../../components/LogIn'
import SignIn from '../../components/SignIn'

export const LogInContext = createContext()

export const LogInState = ({children}) => {

    const [showLogIn, setShowLogIn] = useState(false)
    const [showSignIn, setShowSignIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [isLogedIn, setIsLogedIn] = useState(false)


    useEffect(()=>{
        setShowLogIn(localStorage.getItem('showLogIn')==='true'?true:false)
        setShowSignIn(localStorage.getItem('showSignIn')==='true'?true:false)
        setIsLogedIn(localStorage.getItem('isLogedIn')==='true'?true:false)
        setUserInfo(localStorage.getItem('userInfo')!=='null'?
            JSON.parse(localStorage.getItem('userInfo')):null) 
    },[])

    useEffect(()=>{ //obnova pri kazdom nazatii, a nujno na unmount

        localStorage.setItem('showLogIn', showLogIn)
        localStorage.setItem('showSignIn', showSignIn)
        localStorage.setItem('userInfo', userInfo?JSON.stringify(userInfo):null)
        localStorage.setItem('isLogedIn', isLogedIn)

    },[showLogIn, showSignIn, userInfo, isLogedIn])

    const logOut = () => {
        setIsLogedIn(false)
        setUserInfo(null)
    }


    return(
        <LogInContext.Provider value={{showLogIn, setShowLogIn, showSignIn, setShowSignIn,
            setUserInfo, setIsLogedIn, userInfo, isLogedIn, logOut}}>
            <SignIn/>
            <LogIn/>
            {children}
        </LogInContext.Provider>
    )
}