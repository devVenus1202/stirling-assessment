<template>
    <div class="weather-detail">
        <p>City:{{data.name}}</p>
        <div class="temperature-mode">
            <button @click="switchMode" :class="{active: displayMode=='celsius'}">°C</button>
            <button @click="switchMode" :class="{active: displayMode=='fahrenheit'}">°F</button>
        </div>
        <div class="weather-summary">
            <img :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"/>
            <div>
                <h2>{{getFormattedTemp(data.main.temp)}}</h2>
                <div>{{data.weather[0].main}}({{data.weather[0].description}})</div>
            </div>
        </div>
        <div class="temperature">
            <div class="temperature-info">
                <span>Feels Like</span>
                <span>{{getFormattedTemp(data.main.feels_like)}}</span>
            </div>
            <div class="temperature-info">
                <span>Min Temperature</span>
                <span>{{getFormattedTemp(data.main.temp_min)}}</span>
            </div>
            <div class="temperature-info">
                <span>Max Temperature</span>
                <span>{{getFormattedTemp(data.main.temp_max)}}</span>
            </div>
            <div class="temperature-info">
                <span>Humidity</span>
                <span>{{data.main.humidity}}%</span>
            </div>
            <div class="temperature-info">
                <span>Wind</span>
                <span>{{data.wind.speed}}m/s</span>
            </div>
        </div>
    </div>
</template>
<script>
const CELSIUS = 'celsius';
const FAHRENHEIT = "fahrenheit"
export default {
    props: {
        data: {
            type: Object,
            default: ()=>{}
        },
        
    },
    data() {
        return {
            displayMode: CELSIUS
        }
    },
    methods: {
        switchMode() {
            if (this.displayMode === CELSIUS) {
                this.displayMode = FAHRENHEIT
            } else {
                this.displayMode = CELSIUS
            }
        },
        getFormattedTemp(value) {
            if (this.displayMode === CELSIUS)
                return `${(value - 273.15).toFixed(1)}°C`;
            else 
            
                return `${((value - 273.15) * 9/5 + 32).toFixed(1)}°F`;
        }
        
    }
}
</script>
<style scoped>
.weather-detail .weather-summary {
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.weather-detail .temperature-mode button {
    border:none;
    background: white;
    padding: 10px;
    color: #AAA;
    outline: none;
    cursor: pointer;
}
.weather-detail .temperature-mode button.active {
    color: black;
    font-weight: bold;
}
.weather-detail .temperature .temperature-info{
    margin: 0 30px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
.weather-detail .temperature .temperature-info span:first-child{
    font-size: 1.2em;
    font-weight: bold;
}
</style>