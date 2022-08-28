import React from 'react'
import './About'

export default function About() {
  return (
    <div className="container" id="about-container">
      <h1 className='text-center my-4 ' style={{ textDecorationLine: 'underline' }} >About Us </h1>
      <p id="para">
        WeatherApp is a PWA application, that was developed with the help of <a href="https://openweathermap.org/api" target="blank">Open Weather API</a>, with the ultimate goal is to show the Weather report or forecast of any city, the next 24 hours weather report and next 7 days report.
        <br /><br />
        You can use the search bar to get a weather report of any city and it will also show the next 7 days' weather forcast.
        Users can allow location permission to get the user's current location to display the current location wether.
      </p>
    </div>
  )
}
