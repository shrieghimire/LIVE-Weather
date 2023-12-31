import React, { useState } from "react";
import axios from "axios";
import loader from "../assets/WeatherIcons.gif";

export const WeatherCard = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errMsg, setErrMsg] = useState([]);

  const trimmedValue = location.trim(); // Trims spaces at the beginning and end

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedValue}&units=imperial&appid=072adcf29a78e211bf5f638bfe5a26eb`;

  const searchLocation = async (event) => {
    errMsg === 404 && <p>Enter a valid Location</p>;

    try {
      if (event.key === "Enter") {
        await axios.get(url).then((response) => {
          setData(response.data);
          console.log(response.data);
          document.title =
            response.data.name +
            ` [${response.data.sys.country}]` +
            " - LIVE Weather";
        });
        setLocation("");
      }
    } catch (error) {
      if (error.response) {
        // setLocation(" ");
        // isValue();
        setErrMsg(error.toJSON().status);
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {errMsg === 404 && <p>Enter a valid Location</p>}
      <div>
        {data.main ? (
          <div className="container">
            <div className="top">
              <div className="location">
                <h2>{data.name}</h2>
                <h3>{data.sys.country}</h3>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1>{Math.round((data.main.temp - 32) * (5 / 9))}°C</h1>
                ) : null}
              </div>
              <div className="description">
                {data.weather ? (
                  <>
                    <img
                      className="weather-img"
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                      alt="img"
                    />
                    <p>{data.weather[0].main}</p>
                  </>
                ) : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">
                      {Math.round((data.main.feels_like - 32) * (5 / 9))}°C
                    </p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">
                      {Math.round(data.wind.speed * 1.8)} Km/h
                    </p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="loader">
            {errMsg === 404 && <h4>Enter a valid Location</h4>}
            <img src={loader} alt="loader"></img>
          </div>
        )}
      </div>
    </div>
  );
};
