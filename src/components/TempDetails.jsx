import React from 'react';
import { UilArrowUp, UilArrowDown, UilTemperatureThreeQuarter, UilTear, UilWind, UilBrightness, UilSunset } from '@iconscout/react-unicons'
import { formatToLocalTime, iconUrl } from '../services/weathService';

function TempDetails({ weather: { details, icon, temp, feels_like, humidity, speed, sunrise, sunset, temp_max, temp_min, timezone }}) {
    return (
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>{details}</p>
            </div>
            <div className='flex flex-row items-center justify-between text-white py-3'>
                <img src={iconUrl(icon)} alt="Sunny" className='w-20'/>
                <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
                <div className='flex flex-col space-y-2'>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTemperatureThreeQuarter size={18} className='mr-1' /> Real feel: 
                        <span className='font-bold ml-1'>{`${feels_like.toFixed()}°`}</span>
                    </div>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilTear size={18} className='mr-1' /> Humidity: 
                        <span className='font-bold ml-1'>{`${humidity.toFixed()}%`}</span>
                    </div>
                    <div className='flex font-light text-sm items-center justify-center'>
                        <UilWind size={18} className='mr-1' /> Wind: 
                        <span className='font-bold ml-1'>{`${speed.toFixed()} kmph`}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center space-x-2 text-white text-sm py-10'>
                <UilBrightness size={30}/>
                <p className='font-light w-15'>Rise: <span className='font-bold ml-1'>{formatToLocalTime(sunrise, timezone, 'hh:mm a')}</span></p>
                <p className='font-light'>|</p>

                <UilSunset size={30}/>
                <p className='font-light'>Set: <span className='font-bold ml-1'>{formatToLocalTime(sunset, timezone, 'hh:mm a')}</span></p>
                <p className='font-light'>|</p>

                <UilArrowUp size={30}/>
                <p className='font-light'>High: <span className='font-bold ml-1'>{`${temp_max.toFixed()}°`}</span></p>
                <p className='font-light'>|</p>

                <UilArrowDown size={30}/>
                <p className='font-light'>Low: <span className='font-bold ml-1'>{`${temp_min.toFixed()}°`}</span></p>
            </div>
        </div>
    )
}

export default TempDetails