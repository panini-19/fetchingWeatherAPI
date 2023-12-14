import './Weather.css'
import React, { useState } from 'react';

interface IWeather {
    name: string;
    country: string;
    temp_f: number; 
    humidity: number; 
    condition: string;
} 

const Weather = () => {
    const [searchInput, setSearchInput] = useState('')
    const [weather, setWeather] = useState<IWeather[]>([])

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const getWeather = async () => {
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${searchInput}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '9d3ff7ce14msh5f81ef9baed0042p13bf06jsnc4dda7f6279f',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                },
            });

            const data = await response.json();
          
            setWeather([{
                name: data.location.name,
                country: data.location.country,
                temp_f: data.current.temp_f,
                humidity: data.current.humidity,
                condition: data.current.condition.text
            }]);
            console.log(data);
        } catch (error) {
            console.error('Cannot fetch weather:', error);
        }
    };

    return (
        <>
            <h1>Current Weather</h1>
            <div className='weather-search'>
                <input type='text' placeholder='Enter city' value={searchInput} onChange={handleInput} />
                <div>
                    <button onClick={getWeather}>Search</button>
                </div>
            </div>

            <div className='weather-container'>
                {weather.map((location) => (
                    <div key={location.name} className='city'>
                        <p>{`City: ${location.name}`}</p> 
                        <p>{`Country: ${location.country}`}</p>
                        <p>{`Temperature (F): ${location.temp_f}`}</p>
                        <p>{`Humidity: ${location.humidity}%`}</p>
                        <p>{`Condition: ${location.condition}`}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Weather;

