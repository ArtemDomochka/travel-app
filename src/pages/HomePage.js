import React from 'react'
import Navbar from '../components/Navbar'

const HomePage = props => {

    return(
        <div className="container-xxl"> {/*нужен див или хватит фрагмента? */}
            <header>
                <Navbar displaySearch={true}/>
            </header>

            <div className="container">

            </div>

            <footer>

            </footer>
        </div>
    )
}

export default HomePage
