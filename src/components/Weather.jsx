import React, { useEffect, useState } from "react";
import srch from "../assets/search.png";
import "./Weather.css";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import axios from "axios";

const Weather = () => {
  const [data, setData] = useState(null);
  const apiKey = "4cfd204e9a371cd36fc11a1ef808b16b";
  const [search, setSearch] = useState(null);
  const [searchPressed, setSearchPressed] = useState(null);

  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleClick() {
    console.log(search);
    setSearchPressed(search);
  }

  useEffect(() => {
    const searchFun = async (city) => {
      try {
        // const apiKey = process.env.VITE_APP_ID;
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    searchFun(searchPressed ? searchPressed : "London");
  }, [searchPressed]);
  // useEffect(()=>{
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`)
  //   .then(response=>{
  //     // console.log(response.data);
  //     setData(response.data);
  //   })
  // },[])

  return (
    <div className="weather">
      <div className="search-bar">
        <input onChange={handleChange} type="text" placeholder="search" />
        <img src={srch} alt="Search box " onClick={handleClick} />
      </div>
      {data ? (
        <>
          <img src={clear} className="images" />
          <p className="temp">{Math.floor(data.main.temp)}°C</p>
          <p className="city">{data.name}</p>{" "}
          <div className="weather-data">
            <div className="col">
              <img src={humidity} />
              <div>
                <p>{data.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} />
              <div>
                <p>{data.wind.speed} Km/r</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}
    </div>
  );
};

export default Weather;
