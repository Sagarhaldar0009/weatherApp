import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const[weatherdata, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [DataIn, setDataIn] = useState(false);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f4bd0d27ccf0d983a90da29ef0130a17&units=metric`;

  const fetchApi = async () => {
    axios.get(URL)
    .then(response => {
      setWeatherData(response.data);
      setDataIn(true);
    })
    .catch(err => {
      setWeatherData(null);
      setDataIn(false);
      console.error(err);
    });
  };

  useEffect(() => {
    fetchApi();
  },[]);

  return (
      <div className="container h-screen w-screen text-yellow-600">
{/* 1. Entering the City Name to Search the Data */}
    	  <div className="flex flex-row gap-2 justify-center">
          <div>
            <input
              className="m-2 text-xl p-2 my-10 text-gray-300 bg-gray-900 rounded-md"
              onChange={(event) => {setLocation(event.target.value)}}
              placeholder='Enter Location'
              type="search"
            />
          </div>
          <div>
            <button onClick={fetchApi} className="bg-blue-800 text-white px-5 py-2 mx-2 my-10 rounded-full">Search</button>
          </div>

          

        </div>

{ /* 2. Getting the Data with Some Conditions */ }
      {
        !DataIn ?
        (<div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>)
        :
        (
          <div className="flex flex-col">


            <div className="flex justify-center gap-5 my-10">

              <div className="location">
                <p>
                  <span>Location : </span>
                  <strong>{location},{weatherdata.sys.country}</strong>
                </p>
              </div> 
              <div className="temp">
                <p>
                  <span>Temperature : </span>
                  {
                    weatherdata.main ? <strong>{weatherdata.main.temp}°C</strong> : "Not Found"
                  }
                </p>
              </div>

            </div>
            

          
           <div className="flex justify-evenly gap-48 mt-8">
             <div className="min_temp">
              <div className="grid grid-rows-2 place-items-center">
               <p>
                <div>
                  <span>Minimum Temperature </span>
                </div>
                <div>
                  {
                    weatherdata.main ? <strong>{weatherdata.main.temp_min}°C</strong> : "N/A"
                  }
                </div>  
               </p>
              </div>
             </div>

             <div className="min_temp">
              <div className="grid grid-rows-2">
               <p>
                <div>
                  <span>Minimum Temperature </span>
                </div>
                <div>
                  {
                    weatherdata.main ? <strong>{weatherdata.main.temp_min}°C</strong> : "N/A"
                  }
                </div>  
               </p>
              </div>
             </div>
        </div>




        <div className="flex w-fit text-white mx-auto">
             <div className="humidity border-r-2">
              <p>
                <div className="px-4">
                  <span>Humidity</span>
                </div>
                <div className="px-11">
                {
                  weatherdata.main ? <strong>{weatherdata.main.humidity}%</strong> : "N/A"
                }
                </div> 
              </p>
             </div>

             <div className="description border-r-2">
              <p>
                <div className="px-4">
                  <span>Weather</span>
                </div>
                <div className="px-9">
                  {
                    weatherdata.weather[0] ? <strong>{weatherdata.weather[0].main}</strong> : "N/A"
                  }
                </div>
              </p>
             </div>

             <div className="wind">
              <p>
                <div className="px-4">
                  <span>Wind-Speed</span>
                </div>
                <div className="px-7">
                  {
                    weatherdata.wind ? <strong>{weatherdata.wind.speed} MPH</strong> : "N/A"
                  }
                </div>
                
              </p>
             </div>

          </div> 
        </div>)

      }
  
    </div>
  );
}

export default App;