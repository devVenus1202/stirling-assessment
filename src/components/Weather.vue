<template>
    <div class="weather-content">
        <h1><b>Current location:</b> <span v-if="currentLocation">{{currentLocation.adminArea5}}</span></h1>
        <vue-google-autocomplete class="input-location" id="input-location" ref="address" v-on:placechanged="getAddressData"></vue-google-autocomplete>
        <weather-detail v-if="weatherData" :data="weatherData"></weather-detail>
        <div class="errorMessage" v-if="errorMessage">{{errorMessage}}</div>
    </div>
</template>
<script>
import axios from 'axios';
import VueGoogleAutocomplete from "vue-google-autocomplete";
import {getWeatherData} from "../utils"
import WeatherDetail from './WeatherDetail.vue';
const MAPQUESTAPI = "https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ"
export default {
    components: { 
        WeatherDetail,
        VueGoogleAutocomplete
    },
    data() {
        return {
            currentLocation: null,
            weatherData:null,
            errorMessage: null,
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
            }).catch(e=>{
                console.error(e)
                this.weatherData = null;
                this.errorMessage = "No weather data for this location"
            })
        },
        getAddressData(addressData, placeResultData, id) {
            console.log(addressData)
            console.log(placeResultData);
            console.log(id)
            this.setLocation({coords:{latitude:addressData.latitude,longitude:addressData.longitude}})
        }
    },
}
</script>
<style scoped>
.weather-content {
    width: 500px;
    margin: auto;
    box-sizing: border-box;
    border-radius: 10px;
    background-color:white ;
    padding:20px;
}
.weather-content .input-location {
    padding: 10px;
    width: -webkit-fill-available;
    border-radius: 2px;
    border: solid 1px #AAA;
    margin: 20px;
}
.errorMessage {
    color: red;
    padding: 50px 0;
}
</style>