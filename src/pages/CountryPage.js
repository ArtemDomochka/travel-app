import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


const CountryPage = ({match}) => {
    const countryName = match.params.country
    
    return(
        <div className="container-xxl d-flex flex-column h-100">
            <Header displaySearch={false}/>

            <main className="flex-shrink-0" style={{marginTop:"85px"}}>
                <div className="container">
                    {countryName}
                </div>
            </main>

            <Footer/>
        </div>
    )
}

export default CountryPage
