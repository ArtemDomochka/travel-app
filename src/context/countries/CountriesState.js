import React, {useReducer} from 'react'
import {createContext} from 'react'

export const CountriesContext = createContext()

const SEARCH_COUNTRIES = "SEARCH_COUNTRIES"
const SEARCH_SUBMIT = "SEARCH_SUBMIT"

export const CountriesState = ({children}) => {
    const countries = [
        {
            name: "Spain",
            capital: "Madrid",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg"
        },
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
            name: "Italy",
            capital: "Rome",
            imagePath: "https://i.ibb.co/5F9gRbF/new-Zeland.jpg" 
        },
        {
            name: "Egypt",
            capital: "Cairo",
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

    countries.sort((c1,c2)=>c1.name>c2.name?1:0)

    const initState = {
        countries: countries,
        countriesToDisplay: countries,
        searchSubstring: ''
    }

    const reducer = (state, action) => {
        switch(action.type){
            case SEARCH_COUNTRIES:
                return {...state, countriesToDisplay: action.payload.countriesToDisplay,
                         searchSubstring: action.payload.searchSubstring}
            case SEARCH_SUBMIT:
                return {
                    ...state, countriesToDisplay: action.payload
                }
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, initState)

    const search = value => {
        value = value.trim()

        if(value===''){
            dispatch({
                type: SEARCH_COUNTRIES,
                payload: {
                    countriesToDisplay: state.countries,
                    searchSubstring: value
                }
            })
            return
        }

        let countriesToDisplay = []
        countriesToDisplay = state.countries.filter(country=>{
            return country.name.toLowerCase().includes(value.toLowerCase()) || country.capital.toLowerCase().includes(value.toLowerCase())
                    ? true
                    : false
        })

        let startsWith = countriesToDisplay.filter(country=>country.name[0].toLowerCase()===value[0].toLowerCase() || country.capital[0].toLowerCase()===value[0].toLowerCase())
        startsWith = startsWith.filter(country=>country.name[0].toLowerCase()===value[0].toLowerCase())
            .concat(startsWith.filter(country=>country.name[0].toLowerCase()!==value[0].toLowerCase()))
        const notStartsWith = countriesToDisplay.filter(country=> 
            !startsWith.includes(country)
            ? country.name[0].toLowerCase()!==value[0].toLowerCase() || country.capital[0].toLowerCase()!==value[0].toLowerCase()
            : false
            )
        countriesToDisplay = startsWith.concat(notStartsWith)

        dispatch({
            type: SEARCH_COUNTRIES,
            payload: {
                countriesToDisplay: countriesToDisplay,
                searchSubstring: value
            }
        })

    }

    const searchSubmit = () => {
        if(state.searchSubstring==='') return

        let countriesToDisplay=[]
        countriesToDisplay = state.countries.filter(country=> country.name.toLowerCase()===state.searchSubstring || country.capital.toLowerCase()===state.searchSubstring)

        dispatch({  
            type: SEARCH_SUBMIT,
            payload: countriesToDisplay
        })
    }

    const {countriesToDisplay, searchSubstring} = state //это деструктуризация обьекта или что?

    return(
        <CountriesContext.Provider value={{countriesToDisplay, searchSubstring, search, searchSubmit}}> 
            {children}
        </CountriesContext.Provider>
    )
}