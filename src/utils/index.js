import axios from 'axios'
const apiKey = process.env.VUE_APP_WEATHER_API_KEY
export const getWeatherData = (city)=>{
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
}