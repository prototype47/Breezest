import React from 'react'
import { iconUrl } from '../services/weatherService'

function Forecast({ title, items }) {
    return (
        <div>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-semibold uppercase'>{ title }</p>
            </div>
            <hr className='my-0'/>
            <div className='flex flex-row items-center justify-between text-white'>
                {items.map((item) => (
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm my-3'>{item.title}</p>
                        <img src={iconUrl(item.icon)} alt="" className='w-12 my-1'/>
                        <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                    </div>
                ))}

                {/* <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm my-3'>12:00 PM</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" className='w-12 my-1'/>
                    <p className='font-medium'>22°</p>
                </div>
                
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm my-3'>01:00 PM</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" className='w-12 my-1'/>
                    <p className='font-medium'>22°</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm my-3'>02:00 PM</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" className='w-12 my-1'/>
                    <p className='font-medium'>22°</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm my-3'>03:00 PM</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" className='w-12 my-1'/>
                    <p className='font-medium'>22°</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <p className='font-light text-sm my-3'>04:00 PM</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" className='w-12 my-1'/>
                    <p className='font-medium'>22°</p>
                </div> */}
            </div>
        </div>
    )
}

export default Forecast