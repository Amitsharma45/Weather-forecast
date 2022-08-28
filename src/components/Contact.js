import React from 'react'
import './Contact.css'
export default function Contact() {
  return (
    <div>
      <div className="container mb-5" id="contact-container">
        <h1 className='text-center my-4 ' style={{ textDecorationLine: 'underline' }} >Contact Us </h1>
        <div className="d-flex justify-content-center align-items-center" >
          <div className="card " >
            <img src="https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/229426802/original/add5f4a7c68951c493d2b3656024f57ed8b70b53.jpg" style={{ width: '300px' }} className="card-img-top" alt="..." />
            <div className="card-body text-center" style={{ backgroundColor: '#E3F2FD' }}>
              <h5 className="card-title contact-card-title">Amit Sharma</h5>
              <p className="card-text contact-card-text">B.Tech CSE</p>
              <div className="d-flex justify-content-around align-items-center">
                <a href="https://www.linkedin.com/in/amit-sharma-047434177/" target="blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedIn" className="linkedIn" />
                </a>
                <a href="https://github.com/Amitsharma45" target="blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/1051/1051326.png" alt="Github" className="linkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
