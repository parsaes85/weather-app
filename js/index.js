let $ = document
const form = $.querySelector('form')
const searchInput = $.querySelector('form input')
const searchBtn = $.querySelector('.bx-search')
const cityName = $.getElementById('city-name')
const cityTemp = $.getElementById('city-temp')
const cityWeather  = $.getElementById('city-weather') 
const loader = $.querySelector('.loader')
const feelsTemp = $.getElementById('feels-temp')
const maxTemp = $.getElementById('max-temp')
const minTemp = $.getElementById('min-temp')
const humidityTemp = $.getElementById('humidity-temp')
const pressureTemp = $.getElementById('pressure-temp')

const weatherImg = {
    Clouds: './images/cloudy.jpg',
    Sun: './images/sunny.jpg',
    Rain: './images/rainy.jpg',
    Snow: './images/snowy.jpg',
    Haze: './images/haze.jpg',
    Clear: './images/clear.jpg',
}

const fetchData = async (city) => {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1f663f90b5d7c1d9f31322d1f473186e`)
        let data = await res.json()
        showWeather(data)
        showLoader()
    } catch (error) {
        errorMessage()
        console.log(error)
    }
}
fetchData('tehran')

const showWeather = (weatherData) => {
    console.log(weatherData)
    let weatherMain = weatherData.weather[0].main

    cityName.innerText = weatherData.name
    cityTemp.innerText = Math.floor(weatherData.main.temp - 273.15)
    cityWeather.innerText = weatherMain
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${weatherImg[weatherMain]})`

    feelsTemp.innerText = Math.floor(weatherData.main.feels_like - 273.15)
    maxTemp.innerText = Math.floor(weatherData.main.temp_max - 273.15)
    minTemp.innerText = Math.floor(weatherData.main.temp_min - 273.15)
    humidityTemp.innerText = weatherData.main.humidity + '%'
    pressureTemp.innerText = weatherData.main.pressure + ' atm'
}

const showLoader = () => {
    loader.classList.add('hide')
}
const removeLoader = () => {
    loader.classList.remove('hide')
}

const errorMessage = () => {
    loader.innerHTML = `
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-xl text-center">Can't get weather information. Please Refresh</h1>
        <button class="bg-sky-700 py-2 px-8 rounded-lg" onclick="location.reload()">Refresh</button>
    </div>
    `
}

form.addEventListener('submit', e => {
    e.preventDefault()
})
searchBtn.addEventListener('click', () => {
    if(searchInput.value) {
        fetchData(searchInput.value)
    }

    searchInput.value = ''
    removeLoader()
})
searchInput.addEventListener('keydown', e => {
    if(searchInput.value) {
        if(e.keyCode === 13) {
            fetchData(searchInput.value)
            searchInput.value = ''
            removeLoader()
        }
    }
})
