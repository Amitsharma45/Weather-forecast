async function getdata_name(location) {
    const city = location;
    let d = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");

    if (d.status == 200) {
        var data = await d.json();
        const lon = data.coord.lon;
        const lat = data.coord.lat;
        let main = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d")
        let newdata = await main.json();
        displaytop(data);
        addelement(newdata);
    } else {
        document.getElementsByClassName('load')[0].style.display = 'none';
        alert("Please Enter Correct City Name or Check Spelling")
        console.log("error");
    }
}

async function displaydate_lat_lon(lat, lon) {
    const lonn = lon;
    const latn = lat;
    let d = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latn + "&lon=" + lonn + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");
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
    document.getElementById("weat").innerText = data.weather[0].description;



    document.getElementById("headerimg").innerHTML = `<img id="header-img" src="">`;
    document.getElementById("header-img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.getElementById('city').innerText = data.name + " , " + data.sys.country;
    document.getElementById('temp').innerText = (data.main.temp).toFixed(0);
    document.getElementById('humidity').innerText = "Humidity :" + data.main.humidity + "%";
    document.getElementById('wind').innerText = "wind : " + (data.wind.speed * 3.6).toFixed(2) + " Km/h";
    document.getElementById('Pressure').innerText = "Pressure : " + data.main.pressure + " hPa";

    document.getElementById('middle-tittle').style.display = 'block';
    document.getElementsByClassName('load')[0].style.display = 'none';
    document.getElementsByClassName('header')[0].style.visibility = "visible";
    document.getElementsByClassName('middle')[0].style.visibility = "visible";



}

function addelement(newdata) {
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

}

function timeconvert(time) {

    let unix_timestamp = time
    var date = new Date(unix_timestamp * 1000);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return date.getDate() + ' , ' + months[date.getMonth()];

}
function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error);

    }

    function error() {
        getdata_name("Delhi");

    }
    function showPosition(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        displaydate_lat_lon(position.coords.latitude, position.coords.longitude);
    }
}
getlocation();

function city() {
    let i = document.getElementById('input');
    document.getElementsByClassName('header')[0].style.visibility = "hidden";
    document.getElementsByClassName('middle')[0].style.visibility = "hidden";
    document.getElementById('middle-tittle').style.display = 'none';
    document.getElementsByClassName('load')[0].style.display = 'block';

    getdata_name(i.value);
    i.placeholder = "Search City";
    i.value = "";
}
