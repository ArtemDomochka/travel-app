import React, { useContext } from 'react'
import { CountriesContext } from '../context/countries/CountriesState'
import styles from './Search.module.scss'

const Search = props => {
    const {searchSubstring, search, searchSubmit} = useContext(CountriesContext)
    
    return(
        <li className="nav-item ml-auto">
            <form className="d-flex" onSubmit={event=>event.preventDefault()}>
                <div className="input-group">
                    <input type="text" className="form-control border-right-0 border" placeholder="Search"
                        aria-label="Search" autoFocus
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
                <button className="btn btn-light ml-1" type="button" onClick={searchSubmit}>Search</button>                                 
            </form>
        </li>
    )
}

export default Search