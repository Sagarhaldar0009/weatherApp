import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {

  // const[weatherdata, setWeatherData] = useState(null);

  const [location, setLocation] = useState("Mumbai");

  let weatherdata = null;
   
  const [DataIn, setDataIn] = useState(false);

  const fetchApi = async () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f4bd0d27ccf0d983a90da29ef0130a17&units=metric`).then((data) => {
      weatherdata = data.data;
      setDataIn(true);
      console.log(weatherdata.main);
    }).catch(err => {
      setDataIn(false);
      console.log("Ram NAAM SATYA HAI");
    });

  }

  useEffect( () => {
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
        (<p>No Data Found</p>)
        :
        (
          <div>
            <div className="location">
              <p>{location}</p>
            </div>


            <div className="temp">
              {
                weatherdata.main != null ? <h1>{weatherdata.main.temp}^F</h1> : <p>Not Found</p>
              }
              <h1> </h1>
            </div>


           <div className="description">
            {/* {
              weatherdata.weather ?  : null
            } */}
            <p>{weatherdata.weather[0].main}</p>
           </div>

          
           <div> 
             <div className="feels">
              {
                weatherdata.main ? <p className="bold">{weatherdata.main.feels_like}</p> : null
              }
              <p>Feels Like</p>
             </div>

             <div className="humidity">
              {
                weatherdata.main ? <p className="bold">{weatherdata.main.humidity}%</p> : null
              }
              <p>Humidity</p>
             </div>

             <div className="wind">
              {
                weatherdata.wind ? <p className="bold">{weatherdata.wind.speed} MPH</p> : null
              }
              <p>Wind-Speed</p>
             </div>

          </div> 
        </div>)

      }
  
    </div>
  );
}

export default App;