import './App.css';
import {useEffect, useState} from 'react';
import React from "react";
import { getWeatherData } from './data/weatherapi';
import { ScaleLoader } from 'react-spinners';

function App() {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState("Hanoi");
  const [loading, setLoading] = useState(false);
  
  const getData = async () => {
    try {
      setLoading(true)
      const data = await getWeatherData(city);
      setWeatherData(data); 
      setLoading(false);
    } catch (error) {
      console.log("False", error);
      setLoading(false);
    }
  }
    
    useEffect(() => {
      getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
  const override = `
  display : block;
  margin: 0 auto;
  border-color: red;
  `;
  
  return (
    <div className="App">
      <div className="card">
        <div className="title">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/861/861059.svg"
            alt="iconWeather"
          />
          <br />
          <i>WEATHER</i>
        </div>
        <div className="search-form">
          <input
            type="text"
            value = {city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city name..."
          ></input>
          <button type="button" onClick={() => getData()}>
            Search
          </button>
        </div>
        {loading ? (
          <div className="loader-container">
            <ScaleLoader
              css={override}
              size={200}
              color={"#fff"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {weatherdata !== null ? (
              <div className="main-container">
                <h4>Live Weather</h4>
                <div className="weatherIcon">
                  <img
                    src={`http://openweathermap.org/img/w/${weatherdata.data.weather[0].icon}.png`}
                    alt="imgIcon"
                  />
                </div>
                <h4>{weatherdata.data.weather[0].main}</h4>
                <div className="temperature">
                  <h2>{weatherdata.data.main.temp}&deg;K</h2>
                </div>
                <div className="location">
                  <h3>
                    {" "}
                    {weatherdata.data.name} - {weatherdata.data.sys.country}{" "}
                  </h3>
                </div>
                <div className="temperature-range">
                  <h5>
                    {weatherdata.data.main.temp_max}&deg;K -{" "}
                    {weatherdata.data.main.temp_min}&deg;K{" "}
                  </h5>
                  <h5>Humidity: {weatherdata.data.main.humidity}%</h5>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
