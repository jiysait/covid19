import React, { useEffect, useRef } from 'react'
import { select, scaleUtc, scaleLinear, max, line, extent, curveStep, axisLeft, axisBottom } from "d3"


export default function LineChart({ currentStateData }) {

    const chart = useRef();

    const width = 500
    const height = 350
    const margin = ({ top: 0, right: 0, bottom: 0, left: 0 })

    const setMountPoint = () => (
        // () will return following HTML node
        select(chart.current)
            .attr('viewBox', [0, 0, width, height])
            .style('-webkit-tap-highlight-color', 'transparent')
            .style('overflow', 'visible')
    )

    const drawChart = svg => {

        removeChart(svg)

        svg.append("g").call(xAxis) // place and draw X axis
        svg.append("g").call(yAxis) // place and draw Y axis

        // draw line depends on a given data
        svg.append("path")
            .datum(currentStateData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr('d', getLine)

    }

    const xAxis = g => (
        g.attr("transform", `translate(0,${height - margin.bottom})`)
            .call(axisBottom(x).ticks(width / 70).tickSizeOuter(0))
            .attr("font-size", 18)
            .attr("font-weight", "bolder")
    )

    const yAxis = g => (
        g.attr("transform", `translate(${margin.left},0)`)
            .call(axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-size", 18)
                .attr("font-weight", "bolder")
                .text(currentStateData.y))
    )

    const x = scaleUtc()
        .domain(extent(currentStateData, d => d.date))
        .range([margin.left, width - margin.right])

    const y = scaleLinear()
        .domain([0, max(currentStateData, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top])

    const getLine = line()
        .curve(curveStep)
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y(d => y(d.value))

    const removeChart = svg => {
        svg.selectAll('g').remove()
        svg.selectAll('path').remove()
    }

    useEffect(() => {
        if (currentStateData !== null && currentStateData !== undefined && currentStateData !== '') {
            drawChart(setMountPoint())
        } else {
            removeChart(setMountPoint())
        }
    }, [currentStateData])

    return (
        <svg ref={chart} />
    )

}