import React, { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../context/countries/LanguageState'
import styles from './Weather.module.scss'

const Weather = props => {
    const [forecast, setForecast] = useState(null)
    const {lang} = useContext(LanguageContext)
    
    
    useEffect(()=>{
        const fetchForecast = () => {
            fetch(`https://api.weatherbit.io/v2.0/current?lang=${lang}&city=${props.city}&country=${props.country}&key=c42ecdad2a2943e78995f71c153c7012`)
            .then(response=>response.json())
            .then(forecast=>setForecast(forecast))
        }
    

        fetchForecast()
    },[lang, props])

    const localization = {
        en:{
            temp:"Temp",
            sunrise:"Sunrise",
            sunset:"Sunset"
        },
        ru:{
            temp:"Темп",
            sunrise:"Восход",
            sunset:"Закат"
        },
        uk:{
            temp:"Темп",
            sunrise:"Схід",
            sunset:"Захід"
        }
    }

    return(
        
        forecast
        ? <div className={styles.weatherBox}>
            <img src={require(`../media/icons/${forecast.data[0].weather.icon}.png`).default} alt="wather icon" width="100x"/>
            <div className={styles.title}>{forecast.data[0].weather.description}</div>
            <ul>
                <li>{localization[lang].temp}: {forecast && forecast.data[0].temp}`C</li>
                <li>{localization[lang].sunrise}: {forecast && forecast.data[0].sunrise} AM</li>
                <li>{localization[lang].sunset}: {forecast && forecast.data[0].sunset} PM</li>
            </ul>
         </div>
        : <div className={styles.loadingBox}>

        </div>

            
        
        
    )
}

export default Weather