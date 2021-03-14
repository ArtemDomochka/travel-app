import React, { useContext } from 'react'
import styles from './HomePage.module.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import {CountriesContext} from '../context/countries/CountriesState'

const HomePage = props => {
    const {countriesToDisplay, searchSubstring} = useContext(CountriesContext)

    const refactorString = str => {
        if(searchSubstring==='') return str

        const searchSubstringL = searchSubstring.toLowerCase()
        str = str.toLowerCase()
        if(!str.includes(searchSubstring.toLowerCase())) return str.replace(str[0], str[0].toUpperCase())
        str = str.split(searchSubstringL)
               
        return str.map((substr, index) => {
            return (
                <>
                {
                    substr 
                    ? index===0 
                        ? substr.replace(substr[0], substr[0].toUpperCase())
                        : substr
                    : null
                }
                {
                    index===0 
                        ? substr
                            ? <b style={{color:"red"}}>{searchSubstringL}</b>
                            : <b style={{color:"red"}}>{searchSubstringL.replace(searchSubstringL[0], searchSubstringL[0].toUpperCase())}</b>
                        : index!==str.length-1 
                            ? <b style={{color:"red"}}>{searchSubstringL}</b>
                            : null
                }
                </>
            )
                  
                
                
                
        })
    }

    return(
        <div className="container-xxl d-flex flex-column h-100"> {/*нужен див или хватит фрагмента? */}
            <Header displaySearch={true}/>
            
            <main className="flex-shrink-0" style={{marginTop:"85px"}}>
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center mx-4">
                        {
                                countriesToDisplay.length
                                ? countriesToDisplay.map((country, index)=>{
                                        return(
                                            <div className="px-4 mb-4" style={{width:"300px"}}>
                                                <NavLink to={'/' + country.name} key={index} className={styles.names}>  
                                                    <div className="card" style={{border:"2px solid lightblue"}}>
                                                        <img src={country.imagePath} alt={country.name} className="card-img-top"/>
                                                        <div className="card-body" style={{backgroundColor:"white"}}>
                                                            <h5 className="card-title">{refactorString(country.name)}</h5>
                                                            <h5 className="card-title">{refactorString(country.capital)}</h5>
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        )
                                    })
                                : <h3 className="w-100">Sorry, We didn't find any "<b>{searchSubstring}"</b></h3>
                                
                        }

                        
                    </div>
                </div>
            </main>
                
            
            <Footer/>
        </div>
    )
}

export default HomePage
