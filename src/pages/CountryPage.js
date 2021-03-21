import styles from './CountryPage.module.scss'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Weather from '../components/Weather'
import DateWidget from '../components/DateWidget'
import CurrencyWidget from '../components/CurrencyWidget'
import CustomMap from '../components/CustomMap'
import CustomPlayer from '../components/CustomPlayer'
import OtherGallery from '../components/OtherGallery'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../context/countries/LanguageState'

const CountryPage = ({match}) => {
    const countryName = match.params.country
    
    const {lang} = useContext(LanguageContext)
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchCountry = () => {
            setLoading(true)
    
            fetch(`/api/addCountryPage/${countryName}/${lang}`)
            .then(res=>res.json())
            .then(res=>setCountry(JSON.parse(res)))
    
            setLoading(false)
        }
        fetchCountry()

    },[countryName, lang])

    return(
        <div className="container-xxl d-flex flex-column h-100">
            <Header displaySearch={false}/>

            <main className="flex-shrink-0" style={{marginTop:"85px"}}>
                {
                    !loading && country
                    ? <div className="container-fluid">    
                        <h1>{country.name}. {country.capital}.</h1>
                        
                        <div className={styles.countryInfo}>
                            <img src={country.imgPath} alt="best pct" width="200px" height="150px" style={{float:'left', paddingRight:'10px '}}/>

                            <aside className={styles.asideBlock}>
                                <Weather
                                    country={country.atr}
                                    city={country.capital}
                                />
                                <CurrencyWidget
                                    countryCurrency={country.currency}
                                />
                                <DateWidget
                                    timeZone={country.timeZone}
                                />
                            </aside>

                            <p style={{paddingLeft:'10px'}}>{country.description}</p>
                        </div>  
                        
                        <h4>Check this video. There are some interesting facts about {country.name}.</h4>
                        <CustomPlayer videoPath={country.videoPath}/>

                        <br/>
                        <br/>
                        
                        <h4>There is also a gallery with best places in the country.</h4>
                        <OtherGallery
                            sights={country.sight}
                        />
                        
                        <br/>
                        <br/>
                        
                        <h4>Where is {country.name} located?</h4>
                        <div className="container px-0 mx-0">
                            <CustomMap
                                coords={country.coords}
                                capital={country.capital}
                                atr={country.atr}
                            />
                        </div>

                        
                        

                      </div>
                    : <p style={{textAlign:'center'}}>Loading...</p>
                }
                
            </main>

            <Footer/>
        </div>
    )
}

export default CountryPage
