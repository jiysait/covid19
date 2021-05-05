/**
 * Author: Jongil Yoon
 */
import React, { useEffect, useRef } from "react"
import IntroModel from "./IntroModel"


/**
 * 
 * @returns 
 */
export default function Header() {

    const arrow = useRef()

    /**
     * 
     */
    useEffect(() => {
        arrow.current.animate([
            {left: '0'},
            {left: '10px'},
            {left: '0'}
          ],{
            duration: 700,
            iterations: Infinity
          })
    })

    /**
     * 
     */
    return (
        <section id="jiy-header-hero" className="hero is-link is-fullheight is-fullheight-with-navbar is-flex is-flex-direction-row">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">Drag</h1>

                    <div className="jiy-icon">
                        <span ref={arrow} className="jiy-arrow-right" />
                    </div>

                    <h2 className="subtitle is-3">3D Object created by Jongil Yoon</h2>
                </div>
            </div>
            <div id="jiy-canvas-mount" className="is-flex-grow-1">
                <IntroModel />
            </div>
        </section>
    )

}
