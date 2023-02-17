import React from 'react'

function TopButtons({setQuery}) {

    const cities = [
        {
            id: 1,
            title: "Berlin"
        },
        {
            id: 2,
            title: "Sydney"
        },
        {
            id: 3,
            title: "New York"
        },
        {
            id: 4,
            title: "Chennai"
        },
        {
            id: 5,
            title: "Guwahati"
        },
    ]

    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button className='text-white text-md font-medium px-4 transition ease-out hover:scale-125' key={city.id} onClick={() => setQuery({ q: city.title })}>{city.title}</button>
            ))}
        </div>
    )
}

export default TopButtons