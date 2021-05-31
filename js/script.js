function  displaytop(data){
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("date").innerText = days[d.getDay()] +" , "+d.getDate()+ " " + months[d.getMonth()];
    // document.getElementById("time").innerText=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    document.getElementById("weat").innerText= data.weather[0].description;
    

    document.getElementById("header-img").src=`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` ;
    document.getElementById('city').innerText=data.name+" , "+data.sys.country;
    document.getElementById('temp').innerText=(data.main.temp).toFixed(0);
    document.getElementById('humidity').innerText="Humidity :"+ data.main.humidity+"%";
    document.getElementById('wind').innerText="wind : "+(data.wind.speed*3.6).toFixed(2)+" Km/h";
    document.getElementById('Pressure').innerText="Pressure : "+data.main.pressure+" hPa";
}

async function getdata(location){
    const city =location;
    let d = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d");
    var data = await d.json();
    const lon =data.coord.lon;
    // console.log(lon);
    const lat =data.coord.lat;
    // console.log(lat);
    let main =await fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d")
    let newdata =await main.json();
    displaytop(data);
    // console.log(newdata);
    addelement(newdata);
}
getdata("Aligarh");



function addelement(newdata){
    // let t=timeconvert(newdata.daily[1].dt);
    var middle =document.querySelector('.middle');
    var html='';
    for(let i=1;i<6;i++){
        html+=`<div class="middle-element">
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
    middle.innerHTML=html;
    // console.log(newdata.daily[1].temp.day);
    // <p>Min Temp: ${(newdata.daily[i].temp.min)}</p>
        // <p>Max. Temp: ${(newdata.daily[i].temp.max)}</p>
    
}
// addelement();

function timeconvert(time){
    
    let unix_timestamp =time
    var date = new Date(unix_timestamp * 1000);
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    return date.getDate()+' , '+months[date.getMonth()];
    // var hours = date.getHours();

    // var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    // console.log(date.getDate());
    // console.log(date.getHours());
    // console.log(date.getMinutes());
    
    // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    // console.log(formattedTime);
}



// function time(){

    //     setTimeout(() => {
    //         var d = new Date();
    //         document.getElementById("time").innerText=d.getHours()+":"+d.getMinutes()+":"+(d.getSeconds());
    //         // console.log(d.getSeconds());
    //         // console.log("jhi");9
    //         time();
    //     }, 1000);
    // }
    // time();

// timeconvert(1622356200);















































