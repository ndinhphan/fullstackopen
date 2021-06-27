import React, { useEffect, useState } from 'react'
import axios from 'axios'

//yes i know this is bad
const REACT_APP_WEATHERSTACK_API_KEY = '7a4fee45916a3479a4d4cd5ad382934e'
const api_key = REACT_APP_WEATHERSTACK_API_KEY

const CountryForm = ({ handleCountryChange, countrySearch }) => {
  return (
    <form>
      <div>
        name: <input onChange={handleCountryChange} value={countrySearch} />
      </div>
      <div>debug: {countrySearch}</div>
    </form>
  )
}

const CountryDisplay = ({ country }) => {
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState({})
  const language = country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)
  const style = { width: 200, height: 200 }
  const handleOnClickShow = () => {
    setShow(true)
  }

  useEffect(() => {
    let fetched = false
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then((response) => {
        console.log(response.data)
        if (!fetched) setWeather(response.data.current)
      })
    return () => (fetched = true)
  }, [country.capital])

  if (!show) return (
    <div>
      {country.name}
      <button onClick={handleOnClickShow} >show</button>
    </div>
  )

  return (
    <div key={country.name}>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {language}
      </ul>
      <img style={style} src={country.flag} alt="country flag" />
      <h3>weather in {country.capital}</h3>
      <h4>temperature: {weather.temperature}</h4>
      <img style={style} src={weather.weather_icons[0]} alt="weather" />
      <h4>wind: {weather.wind_speed} mph direction {weather.wind_dir}</h4>
    </div>
  )
}
const SearchResults = ({ countries, countrySearch }) => {
  const result = countries.filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))
  let render
  if (result.length >= 1 && countrySearch && result.length <= 10)
    render = result.map((country) => <CountryDisplay key={country.name} country={country} />)
  return (
    <div>
      {render}
    </div>
  )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')
  const handleCountryChange = (event) => {
    event.preventDefault()
    setCountrySearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  return (
    <div>
      <h2>find</h2>
      <CountryForm handleCountryChange={handleCountryChange} countrySearch={countrySearch} />
      <SearchResults countries={countries} countrySearch={countrySearch} />
    </div>
  )
}

export default App