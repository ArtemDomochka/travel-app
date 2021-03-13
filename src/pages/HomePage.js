import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

const HomePage = props => {

    const countries = [
        {
            name: "Australia",
            capital: "Sydney",
            imagePath: "https://i.ibb.co/pyyHgmD/australia.jpg" 
        },
        {
            name: "America",
            capital: "Washington",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg" 
        },
        {
            name: "Japan",
            capital: "Tokyo",
            imagePath: "https://i.ibb.co/WFt0L2W/japan.jpg" 
        },
        {
            name: "China",
            capital: "Peking",
            imagePath: "https://i.ibb.co/ct3tFH3/china.jpg" 
        },
        {
            name: "New Zealand",
            capital: "Wellington",
            imagePath: "https://i.ibb.co/5F9gRbF/new-Zeland.jpg" 
        },
        {
            name: "Great Britain",
            capital: "London",
            imagePath: "https://i.ibb.co/WPv8GDQ/london.jpg" 
        },
        {
            name: "German",
            capital: "Berlin",
            imagePath: "https://i.ibb.co/pZfnkm6/german.jpg" 
        },
        {
            name: "France",
            capital: "Paris",
            imagePath: "https://i.ibb.co/7b9crkH/france.jpg" 
        },
    ]

    return(
        <div className="container-xxl d-flex flex-column h-100"> {/*нужен див или хватит фрагмента? */}
            <Header displaySearch={true}/>

            <main className="flex-shrink-0">
                <div className="container-fluid">
                    <div className="row d-flex justify-content-center mx-4">
                        {
                            countries.map((country, index)=>{
                                return(
                                    <div className="px-4 mb-4" style={{width:"300px"}}>
                                        <NavLink to={'/' + country.name} key={index}>  
                                            <div className="card">
                                                <img src={country.imagePath} alt={country.name} className="card-img-top"/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{country.name}</h5>
                                                    <h5 className="card-title">{country.capital}</h5>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                )
                            })
                        }

                        
                    </div>
                </div>
            </main>
                
            
            <Footer/>
        </div>
    )
}

export default HomePage
