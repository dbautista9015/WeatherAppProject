import DataToWebsite from "../scripts/DoNotKnow.js"
import { SaveToLocalStorage, RemoveFromLocalStorage, CheckLocalStorage } from "../scripts/localStorage.js";


let lat;
let lon;
let cityName;
let displayCity = document.getElementById('displayCity');

let inputField = document.getElementById('inputField');
let button = document.getElementById('button-addon2');

let heartIcon = document.getElementById('heartIcon');

let dropdown_menu = document.getElementsByClassName('dropdown-menu')[0];



function GetLatLong(town) {

    console.log(town);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${town}&APPID=8903d3033bcdc5adc4484ce6f5201cfd`)
    .then(res => {
        if (!res.ok) {
            throw Error (alert('City Not Found'))
        }
        else {
            //Display City Name
            displayCity.textContent = town;
            
            return res.json();
        }
        
    })
    .then(data => {
        // console.log(`Latitude: ${data.city.coord.lat}`);
        // console.log(`Longtitude: ${data.city.coord.lon}`);
        // Latitude: 37.9577
        // Longtitude: -121.2908

        lat = data.city.coord.lat;
        lon = data.city.coord.lon;
        town = data.city.name

        GetWeatherData(lat, lon, town);


        
    })

}

function GetWeatherData(lattitude, longtitude, nameOfCity) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longtitude}&exclude=hourly&appid=8903d3033bcdc5adc4484ce6f5201cfd`)
    .then(response => response.json())
    .then(dat => {
        
        const cityInfoArray = {
            information: [],
            cityName: nameOfCity
        };
        

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

                

                // console.log(`Current Temperature: ${currentTemp}° C`);
                // console.log(`Temperature Min: ${currentTempMin}° C`);
                // console.log(`Temperature Max: ${currentTempMax}° C`);
                // console.log(`Weather condition: ${dat.current.weather[0].description}`);
                // console.log(`Humidity: ${dat.current.humidity}%`);
                // console.log(`Wind Speed: ${Math.round(dat.current.wind_speed * 3.6)} km/h`);
                // console.log(`Current Day: ${dayDate}`);
                // console.log(`Date: ${monthDayYearDate}`);

                //Adds current day info from api into object
                cityInfoArray.information.push(
                    {
                        currentTemp: currentTemp,
                        minTemp: currentTempMin,
                        maxTemp: currentTempMax,
                        weather: dat.current.weather[0].description,
                        humidity: dat.current.humidity,
                        windSpeed: Math.round(dat.current.wind_speed * 3.6),
                        day: dayDate,
                        date: monthDayYearDate,
                        weatherPic: dat.current.weather[0].icon
                    }
                )
                
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

                // console.log(`Temperature: ${temp}° C`);
                // console.log(`Temperature Min: ${tempMin}° C`);
                // console.log(`Temperature Max: ${tempMax}° C`);
                // console.log(`Weather condition: ${dat.daily[i].weather[0].description}`);
                // console.log(`Humidity: ${dat.daily[i].humidity}%`);
                // console.log(`Wind Speed: ${Math.round(dat.daily[i].wind_speed * 3.6)} km/h`);
                // console.log(`Current Day: ${dayDate}`);
                // console.log(`Date: ${monthDayYearDate}`);


                //Adds Api information to object
                cityInfoArray.information.push(
                    {
                        currentTemp: temp,
                        minTemp: tempMin,
                        maxTemp: tempMax,
                        weather: dat.daily[i].weather[0].description,
                        humidity: dat.daily[i].humidity,
                        windSpeed: Math.round(dat.daily[i].wind_speed * 3.6),
                        day: dayDate,
                        date: monthDayYearDate,
                        weatherPic: dat.daily[i].weather[0].icon
                    }
                )

            }
            console.log('');

        }

        DataToWebsite(cityInfoArray);
        
    });
}



button.addEventListener('click', function(e) {

    if (inputField.value.length === 0) {
        cityName = 'Stockton';
    } else {
        cityName = inputField.value;
    }
    heartIcon.className = 'far fa-heart fa-3x';
    GetLatLong(cityName);
});



heartIcon.addEventListener('click', function(e) {
    
    if (heartIcon.className === 'far fa-heart fa-3x') {
        heartIcon.className = 'fas fa-heart fa-3x';
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.className = 'dropdown-item';
        a.href = '#';
        a.textContent = cityName;

        dropdown_menu.appendChild(li);
        li.appendChild(a);
    } else {
        heartIcon.className = 'far fa-heart fa-3x';
        // dropdown_menu.removeChild(dropdown_menu.childNodes[]);

        console.log(dropdown_menu.childNodes);
        console.log(dropdown_menu.childNodes[1].childNodes[0].textContent);
        console.log(cityName);

        for (let i = 1, j = 0; i < dropdown_menu.childNodes.length; i++) {
             if (dropdown_menu.childNodes[i].childNodes[j].textContent === cityName) {
                 dropdown_menu.removeChild(dropdown_menu.childNodes[i]);
                 break;
             }
        }


    }
});











