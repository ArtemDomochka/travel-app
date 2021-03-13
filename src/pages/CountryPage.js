import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'


const CountryPage = props => {

    return(
        <div className="container-xxl">
            <Header displaySearch={false}/>

            <h1>Country Info</h1>

            <Footer/>
        </div>
    )
}

export default CountryPage
