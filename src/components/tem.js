import React, { useState, useEffect } from "react";
import Weathercard from "./weather_card";
import "./style.css";


export default function Tem() {
    
  const [searchValue, setSearchValue] = useState("mathura");
  const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo=async ()=>{
        try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7bdd4a3c2bc3410bdf134917523d33ba`;
        console.log(url);
        let res = await fetch(url);
        let data = await res.json();
         const{temp,humidity, pressure} = data.main;
         const { main: weathermood } = data.weather[0];
         const { name } = data;
         const { speed } = data.wind;
         const { country, sunset } = data.sys;
   
         const myNewWeatherInfo = {
           temp,
           humidity,
           pressure,
           weathermood,
           name,
           speed,
           country,
           sunset,
         };
   
         setTempInfo(myNewWeatherInfo);
        //  console.log(myNewWeatherInfo);
       } catch (error) {
         console.log(error);
       }
     };

     useEffect(() => {
       getWeatherInfo();

     }, []);

    
    

  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search"
            placeholder='serach...'
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
             />
             <button className='searchButton' type='button' 
            onClick={getWeatherInfo}>                
                Search
             </button>
        </div>
    </div>
    <Weathercard {...tempInfo} />
    </>
  )
  }