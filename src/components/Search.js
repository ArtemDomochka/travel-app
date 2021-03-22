import React, { useContext } from 'react'
import { CountriesContext } from '../context/countries/CountriesState'
import { LanguageContext } from '../context/countries/LanguageState'
import styles from './Search.module.scss'

const Search = props => {
    const {searchSubstring, search, searchSubmit} = useContext(CountriesContext)
    const {lang} = useContext(LanguageContext)

    const content = {
        en:{
            placeholder:"Enter country or capital",
            search:"Search"
        },
        ru:{
            placeholder:"Введите страну или столицу",
            search:"Поиск"
        },
        uk:{
            placeholder:"Задайте державу або столицю",
            search:"Пошук"
        }
    }

    return(
        <li className="nav-item ml-auto">
            <form className="d-flex" onSubmit={event=>event.preventDefault()}>
                <div className="input-group">
                    <input 
                        type="text"
                        className="form-control border-right-0 border"
                        placeholder={content[lang].placeholder}
                        aria-label="Search"
                        autoFocus
                        value={searchSubstring}
                        onChange={event=>{search(event.target.value)}}
                        onKeyPress={event=>event.key==="Enter"?searchSubmit():null}
                    />
                    <div className={"input-group-append " + styles.cross}
                        onClick={()=>{search('')}}
                    > {/*бордер решил ситуацию с аутлайнами*/}
                        <span className="input-group-text bg-white border-left-0 border">X</span>
                    </div>
                </div>   
                <button className="btn btn-warning ml-1" type="button" onClick={searchSubmit}
                    style={{color:'white'}}
                >
                    {content[lang].search}    
                </button>                                 
            </form>
        </li>
    )
}

export default Search