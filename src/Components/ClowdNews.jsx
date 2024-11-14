// import React from 'react'
import searchIcon from "../assets/images/Assets/search.png";
import humidity from "../assets/images/Assets/humidity.png";
import wind from "../assets/images/Assets/windy.png"
import Pressure from "../assets/images/Assets/pressure.png";
import "./ClowdNews.css"
import { useEffect, useRef, useState } from "react";

const ClowdNews = () =>
{

  const inpRef = useRef()
  const [cloweddata, setCloweddata] = useState(false)
  
  const Icons = {
    '01d': 'https://openweathermap.org/img/wn/01d@2x.png',
    '02d': 'https://openweathermap.org/img/wn/02d@2x.png',
    '03d': 'https://openweathermap.org/img/wn/03d@2x.png',
    '04d': 'https://openweathermap.org/img/wn/04d@2x.png',
    '09d': 'https://openweathermap.org/img/wn/09d@2x.png',
    '10d': 'https://openweathermap.org/img/wn/10d@2x.png',
    '13d': 'https://openweathermap.org/img/wn/13d@2x.png'
  };
  
  const clear = "https://openweathermap.org/img/wn/01d@2x.png"


  const Search = async (city) =>
  {
    if (city === "") {
      alert("Please enter the city name");
      return;
    }

    try {
      const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(Url);
      const data = await response.json();
      if (!response.ok) {
        alert("Enter Valid city name")
        return;
      }

      const Icon = Icons[data.weather[0].icon] || clear;
      
      setCloweddata({
        humidity: data.main.humidity,
        Pressure: data.main.pressure,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon:Icon
      })

    } catch (error) {
      console.error("Error in fetching data", error);
      setCloweddata(false)
      console.error("Error in featching data");

    }
  }

  useEffect(() =>
  {
    Search("hyderabad")
  },[])
  return (
    <div className="wather">
      <div className="navbar">
        <input ref={inpRef} type="text" placeholder="Enter the city name" />
        <img src={searchIcon} alt="search-icon" onClick={()=> Search(inpRef.current.value)} />
      </div>
     
      {cloweddata ? <>      
        
      <img src={cloweddata.icon} alt="Condition-logo" id="cnd-logo" />
      <p className="temperature">{cloweddata.temperature}°C</p>
      <span className="location">{cloweddata.location}</span>

      <div className="w-data">
        <img src={humidity} alt="" />
        <div>
          <p>Humidity</p>
          <h5>{cloweddata.humidity}</h5>
        </div>
        <img src={wind} alt="wind-logo" />
        <div>
          <p>Wind</p>
          <h5>{cloweddata.windspeed}</h5>
        </div>
      </div>
      <div className="aqi">
        <img src={Pressure} alt="" id="aqi-logo" />
        <div>
          <p>Pressure</p>
          <h6>{cloweddata.Pressure}</h6>
        </div>
      </div>
      
      </> : <></>}
    </div>
  )
}

export default ClowdNews