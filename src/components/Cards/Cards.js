/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Cards.css'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function Cards(props) {

    const { data } = props;
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [modaldata, setmodaldata] = React.useState(undefined);
    function timeconvert(time) {
        var myDate = new Date(time * 1000);
        return myDate.toLocaleTimeString();
    }
    function dateconvert(dt) {
        var date = new Date(dt * 1000);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return date.getDate() + ' , ' + months[date.getMonth()];
    }
    function Moredetails() {
        const item = data && data.daily[modaldata + 1];
        if (modaldata !== undefined) {
            return (
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='text-center'>{dateconvert(item.dt)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="card-title text-center mb-3">Weather : {item.weather[0].description}</h5>
                        <div className='row container'>
                            <div className="temp_details col-6 " style={{paddingLeft  : '15px'}}>
                            <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Humidity
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img id="temp_icon" src={'https://cdn-icons-png.flaticon.com/512/578/578135.png'} />&nbsp;&nbsp;{item.humidity} %</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Wind speed
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img id="temp_icon" src={'https://cdn-icons-png.flaticon.com/512/3050/3050874.png'} />&nbsp;&nbsp;{(item.wind_speed)}  m/sec</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Air Pressure
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1809/1809544.png'} id="temp_icon" />&nbsp;&nbsp;{item.pressure} hPa</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Min Temp.
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/6726/6726889.png'} id="temp_icon" />&nbsp;&nbsp;{item.temp.min}<sup>&deg;C</sup></p>
                                    </OverlayTrigger>        
                            </div>
                            <div className="temp_details col-6" style={{paddingLeft  : '10px'}}>
                            <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Sunrise Time
                                            </Tooltip>
                                        }

                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1146/1146824.png'} id="temp_icon" />&nbsp;&nbsp;{timeconvert(item.sunrise)}</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Sunset Time.
                                            </Tooltip>
                                        }

                                    >
                                    <p ><img src={'https://cdn-icons-png.flaticon.com/512/414/414825.png'} id="temp_icon" />&nbsp;&nbsp;{item.clouds} %</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Cloud %.
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/1146/1146825.png'} id="temp_icon" />&nbsp;&nbsp;{timeconvert(item.sunset)}</p>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip id={`tooltip-bottom`}>
                                                Max. Temp.
                                            </Tooltip>
                                        }
                                    >
                                        <p ><img src={'https://cdn-icons-png.flaticon.com/512/7074/7074058.png'} id="temp_icon" />&nbsp;&nbsp;{item.temp.max}<sup>&deg;C</sup></p>
                                    </OverlayTrigger>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            );
        }

    }

    return (
        <div className='card_component pb-5 '>
            <h1 className='text-center pt-4'>Next 7 Days Weather Forecast</h1>
            <div className='container'>
                <div className='row d-flex justify-content-around'>
                    {data && data.daily.slice(1).map((item, index) =>
                        <div key={item.dt} className="card col-lg-3 col-12 my-4 d-flex justify-content-center" style={{ width: '250px', backgroundColor: 'rgba(0, 0, 0, 0.08)', border: '0px solid black' }}>
                            <div className='d-flex justify-content-center'>
                                <img style={{ height: '130px', width: '130px' }} src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`} />
                            </div>
                            <div className="card-body  text-center ">
                                <h5 className="card-title">{item.weather[0].description}</h5>
                                <h6 className='card-title'>{dateconvert(item.dt)} </h6>
                                <p ><img src={'https://cdn-icons-png.flaticon.com/512/7074/7074058.png'} id="nexttemp_icon" />&nbsp;&nbsp;{item.temp.day}<sup>&deg;C</sup></p>
                                <Button variant="secondary" onClick={() => {
                                    handleShow()
                                    setmodaldata(index)
                                }}>
                                    More Detail's
                                </Button>
                                
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Moredetails />
        </div>
    )
}
