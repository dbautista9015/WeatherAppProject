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


    for (let i = 0; i < cityInfoArr.length; i++) {
        day[i].textContent = cityInfoArr[i].day;
        //Will change weather Icon later
        weatherIcon[i].src = `http://openweathermap.org/img/wn/${cityInfoArr[i].weatherPic}@4x.png`;

        nowTemp[i].textContent = cityInfoArr[i].currentTemp + '°C';
        humid[i].textContent = 'Humidity: ' + cityInfoArr[i].humidity + '%';
        wind[i].textContent = 'Wind: ' + cityInfoArr[i].windSpeed + 'km/h';
        minMaxTemp[i].textContent = cityInfoArr[i].maxTemp + '°C' + ' - ' + cityInfoArr[i].minTemp + '°C'
        date[i].textContent = cityInfoArr[i].date;
    }


}

