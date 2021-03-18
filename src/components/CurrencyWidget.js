import React, { useContext, useEffect, useState } from 'react'
import styles from '../components/CurrencyWidget.module.scss'
import { LanguageContext } from '../context/countries/LanguageState'

const CurrencyWidget = props => {

    const [currencyRates, setCurrencyRates] = useState(null)
    const {lang} = useContext(LanguageContext)
    const countryCurrency = 'CZK'

    useEffect(()=>{
        fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${countryCurrency},EUR,RUB,USD`)
        .then(response=>response.json())
        .then(rates=>{
            setCurrencyRates({
                usd: (rates.rates[countryCurrency] / rates.rates.USD).toFixed(2),
                eur: (rates.rates[countryCurrency] / rates.rates.EUR).toFixed(2),
                rub: (rates.rates[countryCurrency] / rates.rates.RUB).toFixed(2)
            })
        })
        
    },[]) /*pochemu bez [] owibka v console?*/
    
    const localization = {
        en: {
            exchangeRates: "Exchange rates",
            by: "to"
        },
        ru: {
            exchangeRates: "Курсы обмена",
            by: "к"
        },
        uk: {
            exchangeRates: "Курси обміну",
            by: "до"
        }
    }

    return(
        currencyRates
        ? <div className={styles.widgetBox}>
            {localization[lang].exchangeRates}:
            <br/>
            {countryCurrency} {localization[lang].by} USD: {currencyRates.usd}
            <br/>
            {countryCurrency} {localization[lang].by} EUR: {currencyRates.eur}
            <br/>
            {countryCurrency} {localization[lang].by} RUB: {currencyRates.rub}
          </div>
        : <div className={styles.loadingBox}>

        </div>
        
        
    )
}

export default CurrencyWidget
