/**
 * Author: Jongil Yoon
 */
import React, { useContext, useEffect, useState } from 'react'
import CovidRecord from './CovidRecord'

import { StoreContext } from './Main'


/**
 * It shows a data table of COVID-19 tracked by Canadian Federal Government
 * @returns A data table
 */
export default function CovidTable() {

    const { covidDataHeader, covidData } = useContext(StoreContext)

    // page control
    const [pageSize, setPageSize] = useState(10)
    const [hitMin, setHitMin] = useState(true)
    const [hitMax, setHitMax] = useState(false)
    const [pageCount, setPageCount] = useState()
    const [page, setPage] = useState(1)

    /**
     * It creates a table header according to a given dataset
     * @returns An array of the data table header
     */
    const getHeaders = () => covidDataHeader.map((head, index) => <th key={index}>{head}</th>)

    /**
     * 
     * @returns 
     */
    const getRecords = () => covidData.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize).map(getRecord)

    /**
     * 
     * @param {*} d 
     * @param {*} i 
     * @returns 
     */
    const getRecord = (d, i) => <CovidRecord key={i} data={d} />

    /**
     * 
     * @param {*} e 
     */
    const goPrev = e => {
        e.preventDefault()
        setHitMax(false)

        const prev = page - 1
        if (prev - 1 > 0) {
            setPage(prev)
        } else if (prev - 1 == 0) {
            setPage(prev)
            setHitMin(true)
        } else {
            setPage(1)
            setHitMin(true)
        }
    }

    /**
     * 
     * @param {*} e 
     */
    const goNext = e => {
        e.preventDefault()
        setHitMin(false)

        const next = page + 1
        if (next + 1 < pageCount) {
            setPage(next)
        } else if (next + 1 == pageCount) {
            setPage(next)
            setHitMax(true)
        } else {
            setPage(pageCount)
            setHitMax(true)
        }
    }

    /**
     * 
     */
    useEffect(() => {
        if (covidData !== null && covidData !== undefined && covidData !== '')
            setPageCount(Math.floor(covidData.length / pageSize))
    })

    /**
     * 
     */
    return (
        <>
            <nav className="pagination" role="navigation" aria-label="pagination">
                <span className="pr-6">Total Data Count: {covidData && covidData.length}</span>
                <span className="pr-6">Current Page: {covidData && page} / {covidData && pageCount}</span>
                <a onClick={goPrev} className="pagination-previous" title="This is the first page" disabled={hitMin}>Previous</a>
                <a onClick={goNext} className="pagination-next" disabled={hitMax}>Next page</a>

                <ul className="pagination-list">
                    {/* placeholer */}
                </ul>
            </nav>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            {covidDataHeader && getHeaders()}
                        </tr>
                    </thead>

                    <tbody>
                        {covidData && getRecords()}
                    </tbody>
                </table>
            </div>
        </>
    )

}
