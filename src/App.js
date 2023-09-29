import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const[weatherdata, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Mumbai");
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
      <div>


{/* Entering the City Name to Search the Data */}
    	  <div>
          <input
            className=" border-black w-full text-xl p-2"
            onChange={(event) => {setLocation(event.target.value)}}
            placeholder='Enter Location'
            type="search"
          />

          <button onClick={fetchApi} className="bg-blue-800 text-white py-2 px-5 rounded">Search</button>

        </div>

{/* Getting the Data with Some Conditions */}

      {
        !DataIn ?
        <p>No Data Found</p>
        :
        (
          <div>
            <div className="location">
              <p>
                <span>Location: </span>
                <strong>{location}</strong>
              </p>
            </div>


            <div className="temp">
              <p>
                <span>Temperature: </span>
                {
                  weatherdata.main ? <strong>{weatherdata.main.temp}°F</strong> : "Not Found"
                }
              </p>
            </div>


           <div className="description">
            <p>
              <span>Weather: </span>
              {
                weatherdata.weather[0] ? <strong>{weatherdata.weather[0].main}</strong> : "N/A"
              }
            </p>
           </div>

          
           <div> 
             <div className="feels">
              <p>
                <span>Feels Like: </span>
                {
                  weatherdata.main ? <strong>{weatherdata.main.feels_like}</strong> : "N/A"
                }
              </p>
             </div>

             <div className="humidity">
              <p>
                <span>Humidity: </span>
                {
                  weatherdata.main ? <strong>{weatherdata.main.humidity}%</strong> : "N/A"
                }
              </p>
             </div>

             <div className="wind">
              <p>
                <span>Wind-Speed: </span>
                {
                  weatherdata.wind ? <strong>{weatherdata.wind.speed} MPH</strong> : "N/A"
                }
              </p>
             </div>

          </div> 
        </div>)

      }
  
    </div>
  );
}

export default App;