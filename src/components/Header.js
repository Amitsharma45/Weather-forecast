import React from 'react'
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg " style={{ backgroundColor: '#254E58', color: '#4F4A41' }}  >
                <div className="container-fluid" >
                    <Link to='/' className="navbar-brand">Weather App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/contact">Contact Us</Link>
                            </li>

                        </ul>
                        <div className="d-flex" >

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
