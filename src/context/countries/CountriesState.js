import React, {useEffect, useReducer, useState} from 'react'
import {createContext} from 'react'

export const CountriesContext = createContext()

const SEARCH_COUNTRIES = "SEARCH_COUNTRIES"
const SEARCH_SUBMIT = "SEARCH_SUBMIT"
const CHANGE_LANG = "CHANGE_LANG"

export const CountriesState = ({children}) => {
    const [countries, setCountries] = useState({en:[],ru:[],uk:[]})
    const [homeLoading, setHomeLoading] = useState(false)

    const loadCountries =  () => {
        setHomeLoading(true)

        fetch('https://arcane-citadel-11977.herokuapp.com/api/getCountries')
        //fetch('https://arcane-citadel-11977.herokuapp.com/api/getCountries')
        .then(res=>res.json())
        .then(res=>{
            res = JSON.parse(res[0].homePage)
            setCountries(res)
            dispatch({
                type: CHANGE_LANG,
                payload:{
                    countries: res.en,
                    countriesToDisplay: res.en
                }
            })            
        })
        setHomeLoading(false)
    }

    useEffect(()=>{
        loadCountries()
    },[])

    countries.en.sort((c1,c2)=>c1.name>c2.name?1:0)
    countries.ru.sort((c1,c2)=>c1.name>c2.name?1:0)
    countries.uk.sort((c1,c2)=>c1.name>c2.name?1:0)

    const initState = {
        countries: countries.en,
        countriesToDisplay: countries.en,
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
            case CHANGE_LANG:
                return {
                    ...state, countries: action.payload.countries,
                    countriesToDisplay: action.payload.countriesToDisplay
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

    const changeLang = lang => { //ну сравнение тут идеет по картинкам, да и вообще нужно переделать весь json
        if(!countries.en.length) return
        let pathes = state.countriesToDisplay.map(country=>country.imagePath)
        let countriesToDisplay = countries[lang].filter(country=>pathes.includes(country.imagePath))
        dispatch({
            type: CHANGE_LANG,
            payload:{
                countries: countries[lang],
            countriesToDisplay: countriesToDisplay
            }
        })
    }

    const {countriesToDisplay, searchSubstring} = state //это деструктуризация обьекта или что?

    return(
        <CountriesContext.Provider 
            value={{countriesToDisplay, searchSubstring, homeLoading, search, searchSubmit, changeLang}}> 
            {children}
        </CountriesContext.Provider>
    )
}