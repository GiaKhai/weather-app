import  axios  from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "dcc110cee99490ceef7230a5867a319e";

export const getWeatherData = async (cityname) => {
    try {
        const data = await axios.get(
          baseUrl + `q=${cityname}&appid=${apiKey}` 
        );
        return data;
    } catch (error) {
        throw error;
    }
}