import './App.css';
import { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getFormattedWeatherData from './services/weatherService';

function App() {

  const [ query, setQuery ] = useState({q: "tempe"});
  const [ units, setUnits ] = useState("metric");
  const [ weather, setWeatherData ] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const msg = query.q ? query.q : "current location.";
      toast.info(`Fetching weather data for ${msg}`);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Breezest successfully fetched weather for ${msg}, ${data.country} :)`);
        setWeatherData(data);
       });
    };

    fetchWeather();
  }, [query, units]);

  const formatBg = () => {
    if(!weather) return 'from-cyan-700 to-blue-70';
    const threshold = units === 'metric' ? 20 : 60;
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
    return 'from-yellow-400 to-orange-700';
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 mb-4 py-5 px-32 bg-gradient-to-br ${formatBg()} h-fit shadow-xl rounded-3xl border border-cyan-500`}>
      <header className='flex items-center justify-center font-extrabold text-4xl text-white'>Breezest🍃</header>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <TempDetails weather={weather}/>
          
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={6000} theme='colored' newestOnTop={true} transition={Bounce} style={{ width: "400px"}}/>
    </div>
  );
}

export default App;
