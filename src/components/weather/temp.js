// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// ee73d9def86ffe513a5b9b6878549c12
import React,{useEffect, useState} from 'react'
import "./style.css"
import Weathercard from './weathercard'; 
const Temp = () => {
    const [searchValue, setSearchValue]=useState("Pune");
    const [tempInfo, setTempInfo]=useState("pune")
    const getWeatherInfo =async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ee73d9def86ffe513a5b9b6878549c12`;

            const res=await fetch(url);
            const data=await res.json()

            const {temp,humidity, pressure}=data.main;
            const{main:weathermood} =data.weather[0];
            const {name} =data;
            const{speed} =data.wind;
            const {country, sunset}=data.sys;

            const myNewweatherInfo={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }
            setTempInfo(myNewweatherInfo) 
            // console.log(data); 
        }
        catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        getWeatherInfo();
    },[])
  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input type="search" placeholder='Search...' autoFocus id="search" className='searchterm' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}></input>

                <button className="searchButton" type='button' onClick={getWeatherInfo}>Search</button>
        </div>  
    </div>
    {/* temp card */}
    <Weathercard tempInfo={tempInfo}/>


    </>
  )
}

export default Temp;
