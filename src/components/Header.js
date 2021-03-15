import "bootstrap/js/src/collapse.js"
import React, { useContext } from 'react'
import styles from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import logo from '../media/logo.png'
import Search from "./Search"
import {LanguageContext} from '../context/countries/LanguageState'
import { CountriesContext } from "../context/countries/CountriesState"

const Header = props => { // нужно фиксить маржны в свернутом режиме
                            // изменяется размер, когда уберается правый ползунок

    const {lang, setLang} = useContext(LanguageContext)
    const {changeLang} = useContext(CountriesContext)

    const handleLangChange = newLang => {
        setLang(newLang)
        changeLang(newLang)
    }

    const content = {
        en:{
            signUp: "Sign Up",
            signIn: "Sign In",
            select: {
                en: "EN",
                ru: "RU",
                uk: "UK"
            }
        },
        ru:{
            signUp: "Регистрация",
            signIn: "Войти",
            select: {
                en: "АНГ",
                ru: "РУ",
                uk: "УК"
            }
        },
        uk:{
            signUp: "Регістрація",
            signIn: "Війти",
            select: {
                en: "АНГ",
                ru: "РОС",
                uk: "УК"
            }
        }
    }

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
                                <select className="form-select" value={lang} 
                                    onChange={event=>handleLangChange(event.target.value)}>
                                    <option value="en">{content[lang].select.en}</option>
                                    <option value="ru">{content[lang].select.ru}</option>
                                    <option value="uk">{content[lang].select.uk}</option>
                                </select>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light mr-1" type="button">{content[lang].signIn}</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light" type="button">{content[lang].signUp}</button>
                            </li>   
                        </ul>

                    </div>
                    
                    

                </div>
            </nav>
        </header>
    )
}

export default Header
