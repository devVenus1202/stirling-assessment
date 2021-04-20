<template>
    <div>
        <p>City:{{data.name}}</p>
        <p></p>
        <div class="tempratuer">
            <div class="temperatuer-info">
                <span>Feels Like</span>
                <span>{{getFormattedTemp(data.main.feels_like)}}</span>
            </div>
            <div class="temperatuer-info">
                <span>Min Temperature</span>
                <span>{{getFormattedTemp(data.main.temp_min)}}</span>
            </div>
            <div class="temperatuer-info">
                <span>Max Temperature</span>
                <span>{{getFormattedTemp(data.main.temp_max)}}</span>
            </div>
            <div class="temperatuer-info">
                <span>Humidity</span>
                <span>{{data.main.humidity}}%</span>
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
        swichMode() {
            if (this.displayMode === CELSIUS) {
                this.displayMode = FAHRENHEIT
            } else {
                this.displayMode = CELSIUS
            }
        },
        getFormattedTemp(value) {
            if (this.displayMode === CELSIUS)
                return `${(value - 273.15).toFixed(1)}°C`;
        }
        
    }
}
</script>