import React, { useState } from 'react';
import { UilSearch, UilLocationPinAlt } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inputs({ setQuery, units, setUnits }) {

    const [ city, setCity ] = useState("");
    const handleSearch = () => {
        if(city !== "") setQuery({q: city});
    };
    const handleLocation = () => {
        if(navigator.geolocation) {
            toast.info("Fetching your beautiful location...");
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Breezest found you! Fetched :)");
                setQuery({lat: position.coords.latitude, lon: position.coords.longitude});
            });
        }
    };
    const handleUnits = (e) => {
        const selectedUnits = e.currentTarget.name;
        if(units !== selectedUnits) setUnits(selectedUnits);
    };

    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input value={city} onChange={(e) => setCity(e.currentTarget.value)} type="text" placeholder="Lets have a breezest lookup..." className='text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase rounded-lg border-2 border-cyan-500' />
                <UilSearch size={35} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleSearch} />
                <UilLocationPinAlt size={35} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocation}/>
            </div>
            <div className='flex flex-row w-1/4 items-center justify-center'>
                <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnits}>°C</button>
                <p className='text-xl text-white mx-1'>|</p>
                <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnits}>°F</button>
            </div>
        </div>
    )
}

export default Inputs