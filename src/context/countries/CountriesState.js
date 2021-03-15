import React, {useReducer} from 'react'
import {createContext} from 'react'

export const CountriesContext = createContext()

const SEARCH_COUNTRIES = "SEARCH_COUNTRIES"
const SEARCH_SUBMIT = "SEARCH_SUBMIT"
const CHANGE_LANG = "CHANGE_LANG"

export const CountriesState = ({children}) => {
    const countries = {
        en:
         [
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
    ],
    ru: [
        {
            name: "Испания",
            capital: "Мадрид",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg"
        },
        {
            name: "Австралия",
            capital: "Сидней",
            imagePath: "https://i.ibb.co/pyyHgmD/australia.jpg" 
        },
        {
            name: "Америка",
            capital: "Вашингтон",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg" 
        },
        {
            name: "Япония",
            capital: "Токио",
            imagePath: "https://i.ibb.co/WFt0L2W/japan.jpg" 
        },
        {
            name: "Китай",
            capital: "Пекин",
            imagePath: "https://i.ibb.co/ct3tFH3/china.jpg" 
        },
        {
            name: "Италия",
            capital: "Рим",
            imagePath: "https://i.ibb.co/5F9gRbF/new-Zeland.jpg" 
        },
        {
            name: "Египт",
            capital: "Каир",
            imagePath: "https://i.ibb.co/WPv8GDQ/london.jpg" 
        },
        {
            name: "Германия",
            capital: "Берлин",
            imagePath: "https://i.ibb.co/pZfnkm6/german.jpg" 
        },
        {
            name: "Франция",
            capital: "Париж",
            imagePath: "https://i.ibb.co/7b9crkH/france.jpg" 
        },
    ],
    uk: [
        {
            name: "Іспанія",
            capital: "Мадрид",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg"
        },
        {
            name: "Австралія",
            capital: "Сідней",
            imagePath: "https://i.ibb.co/pyyHgmD/australia.jpg" 
        },
        {
            name: "Америка",
            capital: "Вашингтон",
            imagePath: "https://i.ibb.co/pnj9qP0/america.jpg" 
        },
        {
            name: "Японія",
            capital: "Токіо",
            imagePath: "https://i.ibb.co/WFt0L2W/japan.jpg" 
        },
        {
            name: "Китай",
            capital: "Пекін",
            imagePath: "https://i.ibb.co/ct3tFH3/china.jpg" 
        },
        {
            name: "Італія",
            capital: "Рим",
            imagePath: "https://i.ibb.co/5F9gRbF/new-Zeland.jpg" 
        },
        {
            name: "Єгипт",
            capital: "Каір",
            imagePath: "https://i.ibb.co/WPv8GDQ/london.jpg" 
        },
        {
            name: "Германія",
            capital: "Берлін",
            imagePath: "https://i.ibb.co/pZfnkm6/german.jpg" 
        },
        {
            name: "Франція",
            capital: "Париж",
            imagePath: "https://i.ibb.co/7b9crkH/france.jpg" 
        },
    ]
}

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
            value={{countriesToDisplay, searchSubstring, search, searchSubmit, changeLang}}> 
            {children}
        </CountriesContext.Provider>
    )
}