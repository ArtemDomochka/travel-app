import styles from './CountryPage.module.scss'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Weather from '../components/Weather'
import DateWidget from '../components/DateWidget'
import CurrencyWidget from '../components/CurrencyWidget'
import CustomMap from '../components/CustomMap'
//import CustomPlayer from '../components/CustomPlayer'
import OtherGallery from '../components/OtherGallery'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '../context/countries/LanguageState'
import { FileX } from 'react-bootstrap-icons'

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
                        <div style={{display:'flex'}}>
                            <img src={country.imgPath} alt="best pct" width="200px"/>
                            <p style={{paddingLeft:'10px'}}>{country.description}</p>
                        </div>

                        <div>
                            <Weather/>
                            <CurrencyWidget/>
                            <DateWidget/>
                        </div>

                        
                        {/* <CurrencyWidget/>
                        <DateWidget/> */}
                        {/* <Weather/> */}                      
                        {/* <CustomPlayer/> */}                   
                        {/* <CustomMap/>
                        <p>asdasdsa</p>
                        <OtherGallery/> */}
                      </div>
                    : <p style={{textAlign:'center'}}>Loading...</p>
                }
                
            </main>

            <Footer/>
        </div>
    )
}

export default CountryPage
