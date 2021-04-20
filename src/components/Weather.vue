<template>
    <div class="weather-content">
        <div>My location</div>
        <div v-if="currentLocation">{{currentLocation.adminArea5}}</div>
        <weather-detail v-if="weatherData" :data="weatherData"></weather-detail>
    </div>
</template>
<script>
import axios from 'axios';
import {getWeatherData} from "../utils"
import WeatherDetail from './WeatherDetail.vue';
const MAPQUESTAPI = "https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ"
export default {
    components: { WeatherDetail },
    data() {
        return {
            currentLocation: null,
            weatherData:null
        }
    },
    created () {
        this.getGeoLocation();
    },
    methods: {
        getGeoLocation() {
            navigator.geolocation.getCurrentPosition(this.setLocation)
        },
        setLocation(position) {
            axios.get(`${MAPQUESTAPI}&location=${position.coords.latitude}%2C${position.coords.longitude}&outFormat=json&thumbMaps=false`).then(res => {
                this.currentLocation = res.data.results[0].locations[0]
                this.getWeatherInfo(this.currentLocation.adminArea5)
            })
        },
        getWeatherInfo(city) {
            getWeatherData(city).then(res=>{
                console.log(res)
                this.weatherData = res.data
            })
        }
    },
}
</script>