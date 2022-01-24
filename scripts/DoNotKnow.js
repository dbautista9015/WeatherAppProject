import {SaveToLocalStorage, DeleteLocalStorage} from  "../scripts/localStorage.js";


export default function DataToWebsite(cityInfoArr) {

    //Gets html elements
    let day = document.getElementsByClassName('day');
    let weatherIcon = document.getElementsByClassName('weatherIcon');
    let nowTemp = document.getElementsByClassName('nowTemp');
    let humid = document.getElementsByClassName('humid');
    let wind = document.getElementsByClassName('wind');
    let minMaxTemp = document.getElementsByClassName('minMaxTemp');
    let date = document.getElementsByClassName('date');

    console.log(weatherIcon);


    for (let i = 0; i < cityInfoArr.information.length; i++) {
        day[i].textContent = cityInfoArr.information[i].day;
        //Will change weather Icon later
        weatherIcon[i].src = `http://openweathermap.org/img/wn/${cityInfoArr.information[i].weatherPic}@4x.png`;

        nowTemp[i].textContent = cityInfoArr.information[i].currentTemp + '°C';
        humid[i].textContent = 'Humidity: ' + cityInfoArr.information[i].humidity + '%';
        wind[i].textContent = 'Wind: ' + cityInfoArr.information[i].windSpeed + 'km/h';
        minMaxTemp[i].textContent = cityInfoArr.information[i].maxTemp + '°C' + ' - ' + cityInfoArr.information[i].minTemp + '°C'
        date[i].textContent = cityInfoArr.information[i].date;
    }


}

