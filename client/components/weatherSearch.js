import { useState } from "react";
import SevenDayForcast from "./sevenDayForcast";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "044f381b256ee2734702b271f38a2ccc";

function WeatherSearch(){
    let [searchLocation, setSearch] = useState("");
    let [data, setData] = useState(null);

    function handleLocationChange(event){
    
        setSearch(event.target.value);
    }
    
    function handleSubmit(event){
        event.preventDefault();
        setData("loading");
        const units = "metric";
        const endpoint = `${baseUrl}?q=${searchLocation},,AU&appid=${apiKey}&units=${units}&lang=en`;
        // Make the AJAX request
        
        fetch(endpoint).then(
            function (response){
                if (response.ok) {
                    return response.json();
                } else if (response.status == 404) {
                    console.log(`City not found:${searchLocation}`);
                    throw new Error('error: City Not Found.');
                }
                throw new Error('error: Something went wrong. Please try again later.');
                
        })
        .then(function (data){
            console.log(data);
            setData(data);
        }).catch(function(error){
            console.log(error.message);
            setData(error.message);
        });
    }

    let markup = <p>There is no data to show</p>;
    
    if (data === "loading"){
        markup = <p>Fetching weather data...</p>;
    } 
    else if (data){
        if (String(data).startsWith("error")) {
            //error scenario, either 404 or some other error received
            markup = <p>{data}</p>;
        }
        else {
            //positive case. data received
            markup = (
                <div>
                    <h3>Showing current weather at: {data.name} </h3>
                    <p>Current temperature: {data.main.temp} &#8451;</p>
                    <p>Maximum today: {data.main.temp_max} &#8451;</p>
                    <p>Minimum today: {data.main.temp_min} &#8451;</p>
                    <SevenDayForcast data={data.coord}/>
                </div>
            );
        }
    }
    return(
        <div>
            <h2>Enter the name of the city to get current weather: </h2>
            <form onSubmit={handleSubmit}>
                 <input id="search-city"
                     type="text"
                    value={searchLocation} 
                    onChange={handleLocationChange} 
                    placeholder="ex: Melbourne" 
                 /><br />
                <input type="submit" id="search-button" value="Search"/>
            </form>
            {markup}
        </div>
    );
}

export default WeatherSearch;   
