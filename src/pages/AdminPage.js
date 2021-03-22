
const AdminPage = props => {

    // const handleAddCountry = () => {
    //     fetch('api/addCountries', {
    //         method:'POST',
    //         headers:{'Content-Type': 'application/json'},
    //         body:JSON.stringify(countries)
    //     })
    //     .then(res=>res.json())
    //     .then(res=>()=>{})
    // }

    const  handleAddCountry = () => {
        fetch('api/addCountryPage')
        .then(res=>res.text())
        .then(res=>console.log(res))
    }

    const handleGetCountry = () => {
        fetch('api/addCountryPage/America/en')
        .then(res=>res.json())
        .then(res=>console.log(JSON.parse(res)))
    }

    return(
        
        <div>
            <button onClick={handleAddCountry}>
                Add Country
            </button>
            <button onClick={handleGetCountry}>
                Get Country
            </button>
        </div>
    )
}

export default AdminPage