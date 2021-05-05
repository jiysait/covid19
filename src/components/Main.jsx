/**
 * Author: Jongil Yoon
 */
import React, { createContext, useState, useEffect } from 'react'
import { feature } from 'topojson'

import Navbar from './Navbar'
import Header from './Header'
import Charts from './Charts'

import canada_topo_map from '../res/canadaprovtopo.json'
import data_csv from '../res/covid19.csv'


/**
 * 
 */
export const StoreContext = createContext()

/**
 * 
 * @returns 
 */
export default function Main() {

    const [geoData, setGeoData] = useState()
    const [covidDataHeader, setCovidDataHeader] = useState()
    const [covidData, setCovidData] = useState()

    /**
     * 
     */
    const loadGeoData = async () => {
        const { canadaprov } = canada_topo_map.objects // destructuring
        setGeoData(await feature(canada_topo_map, canadaprov)) // converting topoJSON to geoJSON
    }

    /**
     * 
     */
    const loadData = async () => {
        await fetch(data_csv)
            .then(res => res.text())
            .then(text => csvTojson(text))
    }

    /**
     * 
     * @param {*} csv 
     */
    const csvTojson = csv => {
        let lines = csv.split('\n')
        let result = []
        let headers = lines[0].split(',')
        setCovidDataHeader(headers)
        for(let i = 1; i < lines.length; i++) {
            let obj = {}
            let currentline = lines[i].split(',')

            for(let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }

            result.push(obj)
        }
        setCovidData(result)
    }

    /**
     * 
     */
    useEffect(() => {
        loadGeoData()
        loadData()
    }, [])

    /**
     * 
     */
    return (
        <StoreContext.Provider value={{
            geoData,
            covidDataHeader,
            covidData
        }}>
            <Navbar />
            <Header />
            <Charts />
        </StoreContext.Provider>
    )

}