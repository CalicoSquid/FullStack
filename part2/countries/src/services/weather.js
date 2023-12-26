import axios from "axios";

const API_KEY = "44e4ac5b8dc0921b136dc956a50f102a";

const getWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    return axios
    .get(url)
    .then(res => res.data)
}

export default {getWeatherData}