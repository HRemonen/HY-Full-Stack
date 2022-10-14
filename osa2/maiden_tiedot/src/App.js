import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesRender from './components/CountriesRender'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const hook = () => {
    console.log("Getting promise")
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        console.log('Promise fullfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filterCountry.toLowerCase())
  )

  console.log('Filtered countries: ', filteredCountries)
  
  const handleShowCoutry = (event) => {
    console.log('Clicked', event.target.attributes.country.nodeValue)

    const countryObject = event.target.attributes.country.nodeValue
    setFilterCountry(countryObject) 
  }

  return (
    <div>
      Search countries: <input value={filterCountry} onChange={handleFilterChange} />
      {filteredCountries.length > 0 && 
        <CountriesRender 
          countries={filteredCountries}
          handleClick={handleShowCoutry} 
        />}
    </div>
  )

}

export default App
