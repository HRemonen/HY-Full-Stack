import Weather from "./Weather"

const Language = ({ language }) => <li> {language.name} </li>

const ShowCountry = ({ country }) => {
    console.log('Langs:', Object.values(country[0].languages))
    console.log("Latidute:", country[0].latlng[0], "Longitude:", country[0].latlng[1])
    return (
        <div>
            <h3>{country[0].name}</h3>
            <p>Capital city: {country[0].capital}</p>
            <p>Total area: {country[0].area}</p>

            <h4>Languages:</h4>
            <ul>
                {country[0].languages.map(language => {
                    return <Language key={language.name} language={language} />
                })}
            </ul>
            <img src={country[0].flag} alt='Country flag' widht='175' height='125' />


            <Weather
                capital={country[0].capital}
                location={country[0].latlng} />
        </div>
    )
}

export default ShowCountry