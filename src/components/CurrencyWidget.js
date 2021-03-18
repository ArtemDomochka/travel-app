import React, { useEffect, useState } from 'react'
import styles from '../components/CurrencyWidget.module.scss'

const CurrencyWidget = props => {

    const [currencyRates, setCurrencyRates] = useState(null)
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
    
    return(
        currencyRates
        ? <div className={styles.widgetBox}>
            Exchange rates:
            <br/>
            {countryCurrency} to USD: {currencyRates.usd}
            <br/>
            {countryCurrency} to EUR: {currencyRates.eur}
            <br/>
            {countryCurrency} to RUB: {currencyRates.rub}
            
          </div>
        : <div className={styles.loadingBox}>

        </div>
        
        
    )
}

export default CurrencyWidget
