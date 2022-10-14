import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital, location }) => {
    const [weather, setWeather] = useState()

    const api_key = process.env.REACT_APP_API_KEY
    const api_request = `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=${api_key}&units=metric`

    
    const weatherHook = () => {
        console.log('Getting weather data')
        axios
            .get(api_request)
            .then(response => {
                console.log('Writing weather data')
                setWeather(response.data)
            })
    }

    useEffect(weatherHook, []) 
    
    if (weather) {
        console.log('Weather:', weather)
        return (
            <>
                <h3>Weather in {capital}</h3>
                <p>
                    Temperature: {weather.main.temp} Celcius <br/>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} /> <br/>
                    Wind: {weather.wind.speed} m/s
                </p>
            </>
        )
    }

    
}

export default Weather
