const Language = ({ language }) => <li> {language.name} </li>

const ShowCountry = ({ country }) => {
    console.log('valuess', Object.values(country[0].languages))
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
        </div>
    )
}

export default ShowCountry