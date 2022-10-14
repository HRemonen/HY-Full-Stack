import ShowCountry from "./ShowCountry"

const CountriesRender = ({ countries, handleClick }) => {
    if (!Array.isArray(countries) || !countries.length) {
        return (
            <p>No matching country found.</p>
        )
    }
    else if (countries.length === 1) {
        return (
            <>
                <ShowCountry country={countries} />
            </>
        )   
    }
    else if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter.</p>
        ) 
    }

    return (
        <ul>
            {countries.map(country =>
                <li key={country.name}>{country.name} 
                    <button onClick={handleClick} country={country.name}>Show info</button>
                </li>
            )}
        </ul>
    )
}

export default CountriesRender