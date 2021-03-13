import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {NavLink} from 'react-router-dom'

const HomePage = props => {

    return(
        <div className="container-xxl"> {/*нужен див или хватит фрагмента? */}
            <Header displaySearch={true}/>

            <NavLink to="/Country" className="nav-link">
                Card
            </NavLink>

            <Footer/>
        </div>
    )
}

export default HomePage
