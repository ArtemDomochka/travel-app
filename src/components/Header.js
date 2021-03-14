import "bootstrap/js/src/collapse.js"
import React from 'react'
import styles from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import logo from '../media/logo.png'
import Search from "./Search"

const Header = props => { // нужно фиксить маржны в свернутом режиме
                            // изменяется размер, когда уберается правый ползунок
    return(
        <header>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary py-1">
                <div className="container-fluid"> {/*try w/o fluid*/}
                    <div>
                    <NavLink exact to="/" className="navbar-brand" >
                        <img src={logo} alt="T" width="70px" className={styles.image}/>
                    </NavLink>
                    <NavLink exact to="/" className="navbar-brand">
                        <div className={styles.name}>TRAVEL</div> {/*w/o div??*/}
                    </NavLink>
                    </div>

                    <button className="navbar-toggler" type="button"
                        data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar navbar-nav w-100 px-0">
                            {props.displaySearch
                            ? <Search/>
                            :null
                            }
                            
                            <li className="nav-item ml-auto mr-4">
                                <select className="form-select">
                                    <option value="en" defaultValue>EN</option>
                                    <option value="ru">RU</option>
                                    <option value="uk">UK</option>
                                </select>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light mr-1" type="button">Sing Up</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light" type="button">Sing In</button>
                            </li>   
                        </ul>

                    </div>
                    
                    

                </div>
            </nav>
        </header>
    )
}

export default Header
