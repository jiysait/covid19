/**
 * Author: Jongil Yoon
 */
import React, { useState } from "react"


/**
 * 
 */
export default function Navbar() {

    const [isActive, setActive] = useState(false)

    /**
     * 
     * @param {*} e 
     */
    const handleHamburger = e => {
        e.preventDefault()
        setActive(!isActive)
    }

    /**
     * 
     */
    return (
        <nav className="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item"><a href="http://statistics.ideapot.net" className="jiy-branding">IDEAPOT STATISTICS</a></div>
                <a onClick={handleHamburger} role="button" className={`navbar-burger ${isActive ? " is-active" : ""}`} data-target="jiy-nav-menu" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="jiy-navbar-menu" className={`navbar-menu ${isActive ? " is-active" : ""}`} >
                <div className="navbar-end">
                    <a className="navbar-item" href="http://resume.ideapot.net">
                        {/* <span className="icon jiy-icon">
                            <FontAwesomeIcon icon={faAddressCard} />
                        </span> */}
                        Resume
                    </a>
                    <a className="navbar-item" href="http://portfolio.ideapot.net">
                        {/* <span className="icon jiy-icon">
                            <FontAwesomeIcon icon={faBriefcase} />
                        </span> */}
                        Portfolio
                    </a>
                </div>
            </div>
        </nav>
    )

}