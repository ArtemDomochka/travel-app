import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../context/countries/LanguageState'
import styles from './DateWidget.module.scss'

const DateWidget = prosp => {

    const [time, setTime] = useState(new Date().toLocaleTimeString())

    useEffect(()=>{
        var timer = setInterval(()=>{
            setTime(new Date().toLocaleTimeString())
        },1000)

        return ()=>{
            clearInterval(timer)
        }
    })

    const {lang} = useContext(LanguageContext)

    const localization = {
        en: "en-US",
        ru: "ru-RU",
        uk: "uk-UA"
    }

    return(
        <div className={styles.dateBox}>
            {new Date().getDate()} {new Date().toLocaleDateString(localization[lang], {month:'long'})}
            <br/>
            {new Date().toLocaleDateString(localization[lang], {weekday:'long'})} {/*pochmu tut ne srabotal replace?*/}
            <br/>
            {time}
        </div>
    )
}

export default DateWidget
