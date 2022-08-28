/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import axios from 'axios';
import Chartweat from './Chartweat';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useEffect } from 'react'
import './Main.css'
import { useGeolocated } from "react-geolocated";
import Cards from './Cards/Cards';
import { toast } from 'react-toastify';
export default function Main() {
    const [data, setdata] = React.useState(undefined);
    const [city, setcity] = React.useState('delhi');
    const [nextdata, setnextdata] = React.useState(undefined);
    var d = new Date();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 3000,
        });
    const [findtemp, setfindtemp] = React.useState('');
    useEffect(() => {
        async function getdata() {
            if (coords === undefined) {
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d`);
                setdata(data);
            } else {
                const lon = coords.longitude;
                const lat = coords.latitude;
                const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d")
                setdata(data);
                setcity(data.name)
            }
        }
        getdata();
    }, [city, coords]);

    useEffect(() => {
        async function a() {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d`)
            setnextdata(res.data);
            // console.log(res)
        }
        if (data !== undefined) {
            a();
        }
    }, [data])
    function timeconvert(time) {
        var myDate = new Date(time * 1000);
        return myDate.toLocaleTimeString();
    }

    async function getweather(e) {
        e.preventDefault();
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${findtemp}&units=metric&appid=608fc6e2323f6ea6e8970619c1026e8d`);
            setdata(data);
        } catch {
            toast.error('Please Check City Name!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    return (
        <>
            
            <div className='main' >
                <div className='container'>
                    <form className="input-group mb-4 " id='btn' onSubmit={(e) => getweather(e)}>
                        <input className="form-control " type="search" placeholder="Enter City Name" aria-label="Search"
                            onChange={(e) => setfindtemp(e.target.value)} />
                        <button className="btn btn-secondary" type="submit" disabled={!findtemp.length ? true : false} onSubmit={(e) => getweather(e)}>Search</button>
                    </form>
                    {nextdata !== undefined && data !== undefined ? (
                        <div className='row pt-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', borderRadius: '15px', minHeight: '350px' }}>
                            <div className='col-lg-5 col-md-12 col-sm-12 d-flex justify-content-around flex-column'>
                                <div className='d-flex justify-content-center' >
                                    <img id="img" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} />
                                    <span id="temp" >{(data.main.temp).toFixed(0)}
                                        <sup id="temp_deg">&deg;c</sup>
                                    </span>
                                </div>
                                <div id='city_details' >
                                    <p id="weat">{data.weather[0].description} </p>
                                    <p id="city">{data.name} , {data.sys.country} </p>
                                    <p id="date">{days[d.getDay()]} ,  {d.getDate()}  {months[d.getMonth()]} </p>
                                </div>
                            </div>
                            <div className='col-md-12 col-lg-7 col-sm-12 d-flex justify-content-around align-items-center mt-4' >
                                <div className="temp_details">
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Humidity
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img id="temp_icon" src={'https://cdn-icons-png.flaticon.com/512/578/578135.png'} />&nbsp;&nbsp;{data.main.humidity} %</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Wind speed
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img id="temp_icon" src={'https://cdn-icons-png.flaticon.com/512/3050/3050874.png'} />&nbsp;&nbsp;{(data.wind.speed)}  m/sec</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Air Pressure
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1809/1809544.png'} id="temp_icon" />&nbsp;&nbsp;{data.main.pressure} hPa</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Min Temp.
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/6726/6726889.png'} id="temp_icon" />&nbsp;&nbsp;{nextdata.daily[0].temp.min}
                                            <sup>&deg;C</sup></p>
                                    </OverlayTrigger>
                                </div>
                                <div className="temp_details ">
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Sunrise Time
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1146/1146824.png'} id="temp_icon" />&nbsp;&nbsp;{timeconvert(data.sys.sunrise)}</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Sunset Time.
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1146/1146825.png'} id="temp_icon" />&nbsp;&nbsp;{timeconvert(data.sys.sunset)}</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Cloud %.
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/414/414825.png'} id="temp_icon" />&nbsp;&nbsp;{data.clouds.all} %</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Max. Temp.
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/7074/7074058.png'} id="temp_icon" />&nbsp;&nbsp;{nextdata.daily[0].temp.max}<sup>&deg;C</sup></p>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='text-center'>
                            Loading...
                        </div>
                    )
                    }
                </div>
            </div>
            <Chartweat data={nextdata} />
            <Cards data={nextdata} />
        </>
    )
}
