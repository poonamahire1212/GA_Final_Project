import { useState } from "react";

const baseUrl = "https://api.openweathermap.org/data/2.5/onecall";
const apiKey = "044f381b256ee2734702b271f38a2ccc";

function SevenDayForecast(props){
    let [loc, setLocation]= useState(props.data);
    let [data, setData] = useState(null);

    function dateFormatted(dateLong) {
        console.log(dateLong);
        //dateLong here is in seconds.. as per the weather API doc
        //convert seconds to miliseconds and then feed it to date contructor
        var dt = new Date(dateLong*1000);
        return dt.getUTCDate() + "/" + dt.getUTCMonth();
    }

    function showForecast() {
        console.log("need to fetch 7 days forecast now!");
        
        //set markup to actual html data 
        const units = "metric";
        const exclude = "current,minutely,alerts";
        const endpoint = `${baseUrl}?lat=${loc.lat}&lon=${loc.lon}&exclude=${exclude}&appid=${apiKey}&units=${units}`;

        fetch(endpoint)
        .then(function(response){
                if(response.ok){
                    return response.json();
                }

                throw new Error('error: Something went wrong. Please try again later.');
            })
        .then(function(data){
            setData(data);
            console.log(data);
        })
        .catch(function(error){
            setData(error.message);
        });
    }
    let markup = '';

    if (data) {
        if (String(data).startsWith("error")) {
            //error scenario, some error received
            markup = <p>{data}</p>;
        } else {

            let daysForecast = []
            for(let i = 0; i < data.daily.length; i++) {
                daysForecast.push(<p><b>{dateFormatted(data.daily[i].dt)}:</b> {data.daily[i].temp.max} / {data.daily[i].temp.min} &#8451;</p>);
            }

            markup = (
                <div>
                    <h3>Showing 7 day forecast (max/min): </h3>
                    {daysForecast}
                    
                </div>
            );
        }
    }
     
    return(
        <div>
        <input type="button" id="sevenday" value="Seven Day Forecast" onClick={showForecast}/>
        {markup}
        </div>
    );
}

export default SevenDayForecast;