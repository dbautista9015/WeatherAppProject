
let lat;
let lon;

function GetLatLong() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockton&APPID=8903d3033bcdc5adc4484ce6f5201cfd")
    .then(res => res.json())
    .then(data => {
        // console.log(`Latitude: ${data.city.coord.lat}`);
        // console.log(`Longtitude: ${data.city.coord.lon}`);
        // Latitude: 37.9577
        // Longtitude: -121.2908

        lat = data.city.coord.lat;
        lon = data.city.coord.lon;

        GetWeatherData(lat, lon);


        
    })

}

function GetWeatherData(lattitude, longtitude) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&exclude=hourly&appid=8903d3033bcdc5adc4484ce6f5201cfd`)
    .then(response => response.json())
    .then(dat => {
        
        

        for (let i = 0; i < 6; i++) {
            if (i === 0) {
                //Converts unix time to date
                let unixTimestamp = dat.current.dt;
                let milliseconds = unixTimestamp * 1000;
                let dateObject = new Date(milliseconds);
                let monthDayYearDate = dateObject.toLocaleDateString();
                let dayDate = dateObject.toLocaleDateString("en-US", {weekday: "long"});

                //converts Temperature from kelvin to celsius
                let currentTemp = Math.round(dat.current.temp - 273);
                let currentTempMin = Math.round(dat.daily[0].temp.min - 273);
                let currentTempMax = Math.round(dat.daily[0].temp.max - 273);

                console.log(`Current Temperature: ${currentTemp}° C`);
                console.log(`Temperature Min: ${currentTempMin}° C`);
                console.log(`Temperature Max: ${currentTempMax}° C`);
                console.log(`Weather condition: ${dat.current.weather[0].description}`);
                console.log(`Humidity: ${dat.current.humidity}%`);
                console.log(`Wind Speed: ${Math.round(dat.current.wind_speed * 3.6)} km/h`);
                console.log(`Current Day: ${dayDate}`);
                console.log(`Date: ${monthDayYearDate}`);
                
            }
            else {
                //Converts unix time to date
                let unixTimestamp = dat.daily[i].dt;
                let milliseconds = unixTimestamp * 1000;
                let dateObject = new Date(milliseconds);
                let monthDayYearDate = dateObject.toLocaleDateString();
                let dayDate = dateObject.toLocaleDateString("en-US", {weekday: "long"});

                //converts Temperature from kelvin to celsius
                let temp = Math.round(dat.daily[i].temp.day - 273);
                let tempMin = Math.round(dat.daily[i].temp.min - 273);
                let tempMax = Math.round(dat.daily[i].temp.max - 273);

                console.log(`Temperature: ${temp}° C`);
                console.log(`Temperature Min: ${tempMin}° C`);
                console.log(`Temperature Max: ${tempMax}° C`);
                console.log(`Weather condition: ${dat.daily[i].weather[0].description}`);
                console.log(`Humidity: ${dat.daily[i].humidity}%`);
                console.log(`Wind Speed: ${Math.round(dat.daily[i].wind_speed * 3.6)} km/h`);
                console.log(`Current Day: ${dayDate}`);
                console.log(`Date: ${monthDayYearDate}`);

            }
            console.log('');

            
        }
        
    });
}

GetLatLong();



