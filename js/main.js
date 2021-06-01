async function getdata_name(location){
    const city = location;
    let d = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");
    var data = await d.json();

    const lon = data.coord.lon;
    const lat = data.coord.lat;

    let main = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d")
    let newdata = await main.json();

    displaytop(data);
    addelement(newdata);
}

async function displaydate_lat_lon(lat,lon){
    const lonn = lon;
    const latn = lat;
    let d =await fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latn+ "&lon="+lonn+"&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");
    // let d = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");
    var data = await d.json();


    let main = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d")
    let newdata = await main.json();

    displaytop(data);
    addelement(newdata);
}

function displaytop(data) {
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("date").innerText = days[d.getDay()] + " , " + d.getDate() + " " + months[d.getMonth()];
    // document.getElementById("time").innerText=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    document.getElementById("weat").innerText = data.weather[0].description;


    document.getElementById("header-img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('city').innerText = data.name + " , " + data.sys.country;
    document.getElementById('temp').innerText = (data.main.temp).toFixed(0);
    document.getElementById('humidity').innerText = "Humidity :" + data.main.humidity + "%";
    document.getElementById('wind').innerText = "wind : " + (data.wind.speed * 3.6).toFixed(2) + " Km/h";
    document.getElementById('Pressure').innerText = "Pressure : " + data.main.pressure + " hPa";
}

function addelement(newdata) {
    // let t=timeconvert(newdata.daily[1].dt);
    var middle = document.querySelector('.middle');
    var html = '';
    for (let i = 1; i < 6; i++) {
        html += `<div class="middle-element">
        <div id="date">${timeconvert(newdata.daily[i].dt)}</div>
        
        <div id="img"><img src="https://openweathermap.org/img/wn/${newdata.daily[i].weather[0].icon}@4x.png" alt=""></img></div>
        
        <p><i class="material-icons">
        thermostat
        </i><span>  &nbsp;&nbsp;${(newdata.daily[i].temp.max)} / ${(newdata.daily[i].temp.min)} &#8451;<span></p>
        
        <p><i class="material-icons">
        air
        </i><span> &nbsp;&nbsp;  ${newdata.daily[i].wind_speed} Km/h<span></p>
        
        <p><i class="material-icons">
        water_drop
        </i><span> &nbsp; &nbsp;${newdata.daily[i].humidity}%<span></p>
        </div>
        
        `;
    }
    middle.innerHTML = html;
    // console.log(newdata.daily[1].temp.day);
    // <p>Min Temp: ${(newdata.daily[i].temp.min)}</p>
    // <p>Max. Temp: ${(newdata.daily[i].temp.max)}</p>

}

function timeconvert(time) {

    let unix_timestamp = time
    var date = new Date(unix_timestamp * 1000);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return date.getDate() + ' , ' + months[date.getMonth()];

}
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        
    } else {
        console.log("Geolocation is not supported by this browser.");
        getdata_name("Aligarh");
    }

    function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        displaydate_lat_lon(position.coords.latitude,position.coords.longitude);
    }
}
getlocation();