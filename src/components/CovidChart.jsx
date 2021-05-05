/**
 * Author: Jongil Yoon
 */
import React, { useContext, useEffect, useState, useRef } from "react"
import { select, geoAlbers, geoPath } from "d3"
import LineChart from './LineChart'

import { StoreContext } from "./Main"


/**
 * 
 */
export default function CovidChart() {

    const { geoData } = useContext(StoreContext)
    const { covidData } = useContext(StoreContext)

    const chart = useRef()
    const arrow = useRef()

    const [currentStateData, setCurrentStateData] = useState()

    const width = 900
    const height = 500
    const margin = ({ top: 20, right: 30, bottom: 150, left: 40 })

    /**
     * 
     */
    const animateArrow = () => {
        arrow.current.animate([
            { right: '0' },
            { right: '10px' },
            { right: '0' }
        ], {
            duration: 700,
            iterations: Infinity
        })
    }

    /**
     * 
     */
    const setMountPoint = () => (
        // () will return following HTML node
        select(chart.current)
            .attr('viewBox', [0, 0, width, height])
            .style('-webkit-tap-highlight-color', 'transparent')
            .style('overflow', 'visible')
    )

    /**
     * 
     */
    const drawTopo = svg => {

        const data = joinData()

        // geo group
        const geo = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
            .attr('id', 'jiy-svg-geo')

        const state = geo.selectAll('g')
            .data(data)
            .join('g')
            .attr('id', d => 'jiy-svg-state-' + d.pruid)

        state.append('path')
            .attr('id', d => 'jiy-svg-path-' + d.pruid)
            .attr('class', 'jiy-svg-topo')
            .attr('d', feature => getGeoPath(feature))
            .attr('fill', d => getColorWeight(d.total))
            .attr('stroke', ' #34495e')
            .on('mouseover', handleMouseEnter)

        const label = state.append('g')
            .attr('id', d => 'jiy-svg-meta-' + d.pruid)

        label.append('circle')
            .attr('id', d => 'jiy-svg-circle-' + d.pruid)
            .attr('r', 25)
            .attr('fill', '#34495e')
            .attr('transform', d => 'translate(' + (d.anchor_x - 15) + ', ' + (d.anchor_y - 350) + ')')

        label.append('text')
            .style('font', '11px sans-serif')
            .style('font-weight', 'bold')
            .attr('fill', 'white')
            .attr('transform', d => 'translate(' + (d.anchor_x - 35) + ', ' + (d.anchor_y - 345) + ')')
            .text(d => d.total)

    }

    /**
     * It gets path instruction according to a given projection.
     * @param {Feature} feature 
     * @returns {String} A string contains path instruction used for 'd' attribute of SVG.
     */
    const getGeoPath = feature => {
        const projection = geoAlbers()
        const pathGenerator = geoPath(projection)

        return (pathGenerator(feature))
    }

    /**
     * It merges three datasets which are geoData, covidData, and anchorData.
     * geoData contains data of SVG path per states in Canada.
     * covidData contains cross country data of COVID-19 tracked by Canadian government.
     * anchorData contains coodinates of achor point of states.
     * @returns {Object[]} An array of object which contains join data
     */
    const joinData = () => {
        // geoData + covidData + anchorData

        // scale(.8) => refer to jiy-svg-topo
        // nl 720 230           // 10 === Newfoundland and Labrador
        // pe 800 365           // 11 === Prince Edward Island
        // ns 780 420           // 12 === Nova Scotia
        // nb 690 440           // 13 === New Brunswick
        // qc 620 330           // 24 === Quebec
        // on 480 355           // 35 === Ontario
        // mb 390 310           // 46 === Manitoba
        // sk 320 330           // 47 === Saskatchewan
        // ab 235 290           // 48 === Alberta
        // bc 160 270           // 59 == British Columbia
        // yt 115 150           // 60 === Yukon
        // nt 220 170          // 61 === Northwest Territories
        // nu 400 180           // 62 === Nunavut

        let anchorData = [
            { pruid: 10, anchor_x: 720, anchor_y: 250 },
            { pruid: 11, anchor_x: 800, anchor_y: 365 },
            { pruid: 12, anchor_x: 780, anchor_y: 420 },
            { pruid: 13, anchor_x: 690, anchor_y: 440 },
            { pruid: 24, anchor_x: 620, anchor_y: 330 },
            { pruid: 35, anchor_x: 480, anchor_y: 355 },
            { pruid: 46, anchor_x: 390, anchor_y: 310 },
            { pruid: 47, anchor_x: 320, anchor_y: 330 },
            { pruid: 48, anchor_x: 235, anchor_y: 290 },
            { pruid: 59, anchor_x: 160, anchor_y: 270 },
            { pruid: 60, anchor_x: 115, anchor_y: 150 },
            { pruid: 61, anchor_x: 220, anchor_y: 170 },
            { pruid: 62, anchor_x: 400, anchor_y: 180 }
        ]

        let countData = []

        // 1 === Canada
        const CACase = covidData.filter(data => data.pruid === "1")
        const CALatest = CACase[CACase.length - 1]
        countData.push(
            { id: "CA", pruid: 1, total: Number(CALatest.numtotal) + Number(CALatest.numdeaths) + Number(CALatest.numprob) }
        )

        // 10 === Newfoundland and Labrador
        const NLCase = covidData.filter(data => data.pruid === "10")
        const NLLatest = NLCase[NLCase.length - 1]
        countData.push(
            { id: "CA-NL", pruid: 10, total: Number(NLLatest.numtotal) + Number(NLLatest.numdeaths) + Number(NLLatest.numprob) }
        )

        // 11 === Prince Edward Island
        const PECase = covidData.filter(data => data.pruid === "11")
        const PELatest = PECase[PECase.length - 1]
        countData.push(
            { id: "CA-PE", pruid: 11, total: Number(PELatest.numtotal) + Number(PELatest.numdeaths) + Number(PELatest.numprob) }
        )

        // 12 === Nova Scotia
        const NSCase = covidData.filter(data => data.pruid === "12")
        const NSLatest = NSCase[NSCase.length - 1]
        countData.push(
            { id: "CA-NS", pruid: 12, total: Number(NSLatest.numtotal) + Number(NSLatest.numdeaths) + Number(NSLatest.numprob) }
        )

        // 13 === New Brunswick
        const NBCase = covidData.filter(data => data.pruid === "13")
        const NBLatest = NBCase[NBCase.length - 1]
        countData.push(
            { id: "CA-NB", pruid: 13, total: Number(NBLatest.numtotal) + Number(NBLatest.numdeaths) + Number(NBLatest.numprob) }
        )

        // 24 === Quebec
        const QCCase = covidData.filter(data => data.pruid === "24")
        const QCLatest = QCCase[QCCase.length - 1]
        countData.push(
            { id: "CA-QC", pruid: 24, total: Number(QCLatest.numtotal) + Number(QCLatest.numdeaths) + Number(QCLatest.numprob) }
        )

        // 35 === Ontario
        const ONCase = covidData.filter(data => data.pruid === "35")
        const ONLatest = ONCase[ONCase.length - 1]
        countData.push(
            { id: "CA-ON", pruid: 35, total: Number(ONLatest.numtotal) + Number(ONLatest.numdeaths) + Number(ONLatest.numprob) }
        )

        // 46 === Manitoba
        const MBCase = covidData.filter(data => data.pruid === "46")
        const MBLatest = MBCase[MBCase.length - 1]
        countData.push(
            { id: "CA-MB", pruid: 46, total: Number(MBLatest.numtotal) + Number(MBLatest.numdeaths) + Number(MBLatest.numprob) }
        )

        // 47 === Saskatchewan
        const SKCase = covidData.filter(data => data.pruid === "47")
        const SKLatest = SKCase[SKCase.length - 1]
        countData.push(
            { id: "CA-SK", pruid: 47, total: Number(SKLatest.numtotal) + Number(SKLatest.numdeaths) + Number(SKLatest.numprob) }
        )

        // 48 === Alberta
        const ABCase = covidData.filter(data => data.pruid === "48")
        const ABLatest = ABCase[ABCase.length - 1]
        countData.push(
            { id: "CA-AB", pruid: 48, total: Number(ABLatest.numtotal) + Number(ABLatest.numdeaths) + Number(ABLatest.numprob) }
        )

        // 59 == British Columbia
        const BCCase = covidData.filter(data => data.pruid === "59")
        const BCLatest = BCCase[BCCase.length - 1]
        countData.push(
            { id: "CA-BC", pruid: 59, total: Number(BCLatest.numtotal) + Number(BCLatest.numdeaths) + Number(BCLatest.numprob) }
        )

        // 60 === Yukon
        const YTCase = covidData.filter(data => data.pruid === "60")
        const YTLatest = YTCase[YTCase.length - 1]
        countData.push(
            { id: "CA-YT", pruid: 60, total: Number(YTLatest.numtotal) + Number(YTLatest.numdeaths) + Number(YTLatest.numprob) }
        )

        // 61 === Northwest Territories
        const NTCase = covidData.filter(data => data.pruid === "61")
        const NTLatest = NTCase[NTCase.length - 1]
        countData.push(
            { id: "CA-NT", pruid: 61, total: Number(NTLatest.numtotal) + Number(NTLatest.numdeaths) + Number(NTLatest.numprob) }
        )

        // 62 === Nunavut
        const NUCase = covidData.filter(data => data.pruid === "62")
        const NULatest = NUCase[NUCase.length - 1]
        countData.push(
            { id: "CA-NU", pruid: 62, total: Number(NULatest.numtotal) + Number(NULatest.numdeaths) + Number(NULatest.numprob) }
        )

        // 99 === Repatriated travellers
        const RTCase = covidData.filter(data => data.pruid === "99")
        const RTLatest = RTCase[RTCase.length - 1]
        countData.push(
            { id: "RT", pruid: 99, total: Number(RTLatest.numtotal) + Number(RTLatest.numdeaths) + Number(RTLatest.numprob) }
        )

        return countData.map(cd => ({ ...cd, ...geoData.features.find(gd => gd.id === cd.id) }))
            .map(md => ({ ...md, ...anchorData.find(ad => ad.pruid === md.pruid) }))

    }

    /**
     * 
     * @param {Number} level 
     */
    const getColorWeight = level => {
        // highest -> lowest
        // #cb4335 
        // #e74c3c  
        // #ec7063 
        // #f1948a 
        // #f5b7b1 
        // #fadbd8 
        // #d5dbdb  for N/A
        if (level >= 300000) {
            return '#cb4335'
        } else if (level >= 299999) {
            return '#e74c3c'
        } else if (level >= 99999) {
            return '#ec7063'
        } else if (level >= 49999) {
            return '#f1948a'
        } else if (level >= 9999) {
            return '#f5b7b1'
        } else if (level >= 999) {
            return '#fadbd8'
        } else {
            return '#d5dbdb'
        }
    }

    /**
     * 
     */
    const handleMouseEnter = e => {
        const id = e.target.id.split('-')[3]
        switch (id) {

            // 1 === Canada
            case '1':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "1")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 10 === Newfoundland and Labrador
            case '10':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "10")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 11 === Prince Edward Island
            case '11':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "11")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 12 === Nova Scotia
            case '12':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "12")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 13 === New Brunswick
            case '13':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "13")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 24 === Quebec
            case '24':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "24")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 35 === Ontario
            case '35':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "35")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 46 === Manitoba
            case '46':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "46")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 47 === Saskatchewan
            case '47':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "47")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 48 === Alberta
            case '48':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "48")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 59 == British Columbia
            case '59':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "59")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 60 === Yukon
            case '60':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "60")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 61 === Northwest Territories
            case '61':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "61")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 62 === Nunavut
            case '62':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "62")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            // 99 === Repatriated travellers
            case '99':
                setCurrentStateData(
                    covidData.filter(data => data.pruid === "99")
                        .map(data => ({ date: data.date, value: Number(data.numtotal) + Number(data.numdeaths) + Number(data.numprob) }))
                        .map(d => {
                            let dateStr = d.date.split('-')
                            d.date = new Date(dateStr[1] + ' ' + dateStr[0] + ' ' + dateStr[2])
                            d.value = Number(d.value)
                            return d
                        })
                )
                break

            default:
                setCurrentStateData(null)
                break
        }

    }

    /**
     * 
     */
    useEffect(() => {
        if (
            geoData !== null && geoData !== undefined && geoData.length !== 0 &&
            covidData !== null && covidData !== undefined && covidData !== ''
        ) {
            drawTopo(setMountPoint())
            animateArrow()
        }
    }, [geoData, covidData])

    /**
     * 
     */
    return (
        <div className="tile is-ancestor">
            <div className="tile is-parent is-9">
                <div className="is-child">
                    <svg ref={chart} />
                </div>
            </div>
            <div className="tile is-parent is-vertical">
                <div className="is-child">
                    <div className="jiy-icon-chart">
                        Mouse over
                        <span ref={arrow} className="jiy-arrow-right-dark" />
                    </div>
                    {currentStateData && <LineChart currentStateData={currentStateData} />}
                </div>
            </div>
        </div>
    )

}
