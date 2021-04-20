import axios from 'axios'
const apiKey = "3ba7038a7cce3ce5da63edaf6a0d35ca"
export const getWeatherData = (city)=>{
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
}