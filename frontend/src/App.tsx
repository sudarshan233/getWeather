import Sidebar from "./Components/Sidebar.tsx";
import DashArc from "./Components/DashArc.tsx";
import {useState} from "react";
import api from "./lib/axios.ts";

function App() {
    const [search, setSearch] = useState('');
    const [statusOfModule, setStatusOfModule] = useState(
        'opacity-30 pointer-events-none'
    );
    const [forecastData, setForecastData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = async (city: string) => {
        setLoading(true);

        try {
            const response = await api(
                `/current?city=${city}`
            );
           setCurrentData(response.data.weatherData);
           console.log(response.data.weatherData);
        } catch (error) {
            console.error(error)
        }
    }

    const forecastWeather = async (city: string) => {
        try {
            const response = await api(
                `/forecast?city=${city}`
            );
            setForecastData(response.data.weatherData);
            console.log(response.data.weatherData);

        } catch (error) {
            console.error(error)
        }
        setLoading(false);
        setStatusOfModule('opacity-100');
    }


  return (
    <div className='w-full h-screen bg-dark-primary text-primary
    flex'>
        <Sidebar search={search} setSearch={setSearch} loading={loading}
        getWeather={getWeather} forecastWeather={forecastWeather}
        currentData={currentData}/>
        <main className={`p-4 flex flex-col w-full ${statusOfModule}
        transition-opacity duration-500`}>
            <h2 className='text-xl'>getWeather xV1</h2>
            <section className='h-full w-full flex justify-center items-center
            p-4'>
                <DashArc forecastData={forecastData} currentData={currentData}
                loading={loading}/>
            </section>
        </main>
    </div>
  )
}

export default App
