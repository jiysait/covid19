import React, { useContext, useEffect, useState } from 'react'
import CovidRecord from './CovidRecord'

import { StoreContext } from './Main'


export default function CovidTable() {

    const { covidDataHeader, covidData } = useContext(StoreContext)

    // page control
    const [pageSize, setPageSize] = useState(10)
    const [hitMin, setHitMin] = useState(true)
    const [hitMax, setHitMax] = useState(false)
    const [pageCount, setPageCount] = useState()
    const [page, setPage] = useState(1)

    // column control
    const [pruid, setPruid] = useState(true)
    const [prname, setPrname] = useState(true)
    const [prnameFR, setPrnameFR] = useState(true)
    const [date, setDate] = useState(true)
    const [update, setUpdate] = useState(true)
    const [numconf, setNumconf] = useState(true)
    const [numprob, setNumprob] = useState(true)
    const [numdeaths, setNumdeaths] = useState(true)
    const [numtotal, setNumtotal] = useState(true)
    const [numtested, setNumtested] = useState(true)
    const [numtests, setNumtests] = useState(true)
    const [numrecover, setNumrecover] = useState(true)
    const [percentrecover, setPercentrecover] = useState(true)
    const [ratetested, setRatetested] = useState(true)
    const [numtoday, setNumtoday] = useState(true)
    const [percentoday, setPercentoday] = useState(true)
    const [ratetotal, setRatetotal] = useState(true)
    const [ratedeaths, setRatedeaths] = useState(true)
    const [numdeathstoday, setNumdeathstoday] = useState(true)
    const [percentdeath, setPercentdeath] = useState(true)
    const [numtestedtoday, setNumtestedtoday] = useState(true)
    const [numteststoday, setNumteststoday] = useState(true)
    const [numrecoveredtoday, setNumrecoveredtoday] = useState(true)
    const [percentactive, setPercentactive] = useState(true)
    const [numactive, setNumactive] = useState(true)
    const [rateactive, setRateactive] = useState(true)
    const [numtotal_last14, setNumtotal_last14] = useState(true)
    const [ratetotal_last14, setRatetotal_last14] = useState(true)
    const [numdeaths_last14, setNumdeaths_last14] = useState(true)
    const [ratedeaths_last14, setRatedeaths_last14] = useState(true)
    const [numtotal_last7, setNumtotal_last7] = useState(true)
    const [ratetotal_last7, setRatetotal_last7] = useState(true)
    const [numdeaths_last7, setNumdeaths_last7] = useState(true)
    const [ratedeaths_last7, setRatedeaths_last7] = useState(true)
    const [avgtotal_last7, setAvgtotal_last7] = useState(true)
    const [avgincidence_last7, setAvgincidence_last7] = useState(true)
    const [avgdeaths_last7, setAvgdeaths_last7] = useState(true)
    const [avgratedeaths_last7, setAvgratedeaths_last7] = useState(true)
    const [avgtests_last7, setAvgtests_last7] = useState(true)

    const getHeaders = () => covidDataHeader.map((head, index) => <th key={index}>{head}</th>)

    const getRecords = () => covidData.slice((page - 1) * pageSize, ((page - 1) * pageSize) + pageSize).map(getRecord)

    const getRecord = (d, i) => <CovidRecord key={i} data={d} />

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

    const handleColumn = e => {
        e.preventDefault()

        if(e.target.value === 'pruid')
            setPruid(!pruid)
        if(e.target.value === 'prname')
            setPrname(!prname)
        if(e.target.value === 'prnameFR')
            setPrnameFR(!prnameFR)
        if(e.target.value === 'date')
            setDate(!date)
        if(e.target.value === 'update')
            setUpdate(!update)
        if(e.target.value === 'numconf')
            setNumconf(!numconf)
        if(e.target.value === 'numprob')
            setNumprob(!numprob)
        if(e.target.value === 'numdeaths')
            setNumdeaths(!numdeaths)
        if(e.target.value === 'numtotal')
            setNumtotal(!numtotal)
        if(e.target.value === 'numtested')
            setNumtested(!numtested)
        if(e.target.value === 'numtests')
            setNumtests(!numtests)
        if(e.target.value === 'numrecover')
            setNumrecover(!numrecover)
        if(e.target.value === 'percentrecover')
            setPercentrecover(!percentrecover)
        if(e.target.value === 'ratetested')
            setRatetested(!ratetested)
        if(e.target.value === 'numtoday')
            setNumtoday(!numtoday)
        if(e.target.value === 'percentoday')
            setPercentoday(!percentoday)
        if(e.target.value === 'ratetotal')
            setRatetotal(!ratetotal)
        if(e.target.value === 'ratedeaths')
            setRatedeaths(!ratedeaths)
        if(e.target.value === 'numdeathstoday')
            setNumdeathstoday(!numdeathstoday)
        if(e.target.value === 'percentdeath')
            setPercentdeath(!percentdeath)
        if(e.target.value === 'numtestedtoday')
            setNumtestedtoday(!numtestedtoday)
        if(e.target.value === 'numteststoday')
            setNumteststoday(!numteststoday)
        if(e.target.value === 'numrecoveredtoday')
            setNumrecoveredtoday(!numrecoveredtoday)
        if(e.target.value === 'percentactive')
            setPercentactive(!percentactive)
        if(e.target.value === 'numactive')
            setNumactive(!numactive)
        if(e.target.value === 'rateactive')
            setRateactive(!rateactive)
        if(e.target.value === 'numtotal_last14')
            setNumtotal_last14(!numtotal_last14)
        if(e.target.value === 'ratetotal_last14')
            setRatetotal_last14(!ratetotal_last14)
        if(e.target.value === 'numdeaths_last14')
            setNumdeaths_last14(!numdeaths_last14)
        if(e.target.value === 'ratedeaths_last14')
            setRatedeaths_last14(!ratedeaths_last14)
        if(e.target.value === 'numtotal_last7') 
            setNumtotal_last7(!numtotal_last7)
        if(e.target.value === 'ratetotal_last7')
            setRatetotal_last7(!ratetotal_last7)
        if(e.target.value === 'numdeaths_last7')
            setNumdeaths_last7(!numdeaths_last7)
        if(e.target.value === 'ratedeaths_last7')
            setRatedeaths_last7(!ratedeaths_last7)
        if(e.target.value === 'avgtotal_last7')
            setAvgtotal_last7(!avgtotal_last7)
        if(e.target.value === 'avgincidence_last7')
            setAvgincidence_last7(!avgincidence_last7)
        if(e.target.value === 'avgdeaths_last7')
            setAvgdeaths_last7(!avgdeaths_last7)
        if(e.target.value === 'avgratedeaths_last7')
            setAvgratedeaths_last7(!avgratedeaths_last7)
        if(e.target.value === 'avgtests_last7')
            setAvgtests_last7(!avgtests_last7)
    }

    useEffect(() => {
        if (covidData !== null && covidData !== undefined && covidData !== '')
            setPageCount(Math.floor(covidData.length / pageSize))
    })

    return (
        <>
            <nav className="pagination is-flex-direction-column" role="navigation" aria-label="pagination">
                <div>
                    <span className="pr-6">Total Data Count: {covidData && covidData.length}</span>
                    <span className="pr-6">Current Page: {covidData && page} / {covidData && pageCount}</span>
                    <a onClick={goPrev} className="pagination-previous" title="This is the first page" disabled={hitMin}>Previous</a>
                    <a onClick={goNext} className="pagination-next" disabled={hitMax}>Next page</a>

                    <ul className="pagination-list">
                        {/* placeholer */}
                    </ul>
                </div>
                <div className="buttons are-small">
                    <button onClick={handleColumn} className={`button ${pruid ? ' is-active' : ''}`} value='pruid'>pruid</button>
                    <button onClick={handleColumn} className={`button ${prname ? 'is-active' : ''}`} value='prname'>prname</button>
                    <button onClick={handleColumn} className={`button ${prnameFR ? ' is-active' : ''}`} value='prnameFR'>prnameFR</button>
                    <button onClick={handleColumn} className={`button ${date ? ' is-active' : ''}`} value='date'>date</button>
                    <button onClick={handleColumn} className={`button ${update ? ' is-active' : ''}`} value='update'>update</button>
                    <button onClick={handleColumn} className={`button ${numconf ? ' is-active' : ''}`} value='numconf'>numconf</button>
                    <button onClick={handleColumn} className={`button ${numprob ? ' is-active' : ''}`} value='numprob'>numprob</button>
                    <button onClick={handleColumn} className={`button ${numdeaths ? ' is-active' : ''}`} value='numdeaths'>numdeaths</button>
                    <button onClick={handleColumn} className={`button ${numtotal ? ' is-active' : ''}`} value='numtotal'>numtotal</button>
                    <button onClick={handleColumn} className={`button ${numtested ? ' is-active' : ''}`} value='numtested'>numtested</button>
                    <button onClick={handleColumn} className={`button ${numtests ? ' is-active' : ''}`} value='numtests'>numtests</button>
                    <button onClick={handleColumn} className={`button ${numrecover ? ' is-active' : ''}`} value='numrecover'>numrecover</button>
                    <button onClick={handleColumn} className={`button ${percentrecover ? ' is-active' : ''}`} value='percentrecover'>percentrecover</button>
                    <button onClick={handleColumn} className={`button ${ratetested ? ' is-active' : ''}`} value='ratetested'>ratetested</button>
                    <button onClick={handleColumn} className={`button ${numtoday ? ' is-active' : ''}`} value='numtoday'>numtoday</button>
                    <button onClick={handleColumn} className={`button ${percentoday ? ' is-active' : ''}`} value='percentoday'>percentoday</button>
                    <button onClick={handleColumn} className={`button ${ratetotal ? ' is-active' : ''}`} value='ratetotal'>ratetotal</button>
                    <button onClick={handleColumn} className={`button ${ratedeaths ? ' is-active' : ''}`} value='ratedeaths'>ratedeaths</button>
                    <button onClick={handleColumn} className={`button ${numdeathstoday ? ' is-active' : ''}`} value='numdeathstoday'>numdeathstoday</button>
                    <button onClick={handleColumn} className={`button ${percentdeath ? ' is-active' : ''}`} value='percentdeath'>percentdeath</button>
                    <button onClick={handleColumn} className={`button ${numtestedtoday ? ' is-active' : ''}`} value='numtestedtoday'>numtestedtoday</button>
                    <button onClick={handleColumn} className={`button ${numteststoday ? ' is-active' : ''}`} value='numteststoday'>numteststoday</button>
                    <button onClick={handleColumn} className={`button ${numrecoveredtoday ? ' is-active' : ''}`} value='numrecoveredtoday'>numrecoveredtoday</button>
                    <button onClick={handleColumn} className={`button ${percentactive ? ' is-active' : ''}`} value='percentactive'>percentactive</button>
                    <button onClick={handleColumn} className={`button ${numactive ? ' is-active' : ''}`} value='numactive'>numactive</button>
                    <button onClick={handleColumn} className={`button ${rateactive ? ' is-active' : ''}`} value='rateactive'>rateactive</button>
                    <button onClick={handleColumn} className={`button ${numtotal_last14 ? ' is-active' : ''}`} value='numtotal_last14'>numtotal_last14</button>
                    <button onClick={handleColumn} className={`button ${ratetotal_last14 ? ' is-active' : ''}`} value='ratetotal_last14'>ratetotal_last14</button>
                    <button onClick={handleColumn} className={`button ${numdeaths_last14 ? ' is-active' : ''}`} value='numdeaths_last14'>numdeaths_last14</button>
                    <button onClick={handleColumn} className={`button ${ratedeaths_last14 ? ' is-active' : ''}`} value='ratedeaths_last14'>ratedeaths_last14</button>
                    <button onClick={handleColumn} className={`button ${numtotal_last7 ? ' is-active' : ''}`} value='numtotal_last7'>numtotal_last7</button>
                    <button onClick={handleColumn} className={`button ${ratetotal_last7 ? ' is-active' : ''}`} value='ratetotal_last7'>ratetotal_last7</button>
                    <button onClick={handleColumn} className={`button ${numdeaths_last7 ? ' is-active' : ''}`} value='numdeaths_last7'>numdeaths_last7</button>
                    <button onClick={handleColumn} className={`button ${ratedeaths_last7 ? ' is-active' : ''}`} value='ratedeaths_last7'>ratedeaths_last7</button>
                    <button onClick={handleColumn} className={`button ${avgtotal_last7 ? ' is-active' : ''}`} value='avgtotal_last7'>avgtotal_last7</button>
                    <button onClick={handleColumn} className={`button ${avgincidence_last7 ? ' is-active' : ''}`} value='avgincidence_last7'>avgincidence_last7</button>
                    <button onClick={handleColumn} className={`button ${avgdeaths_last7 ? ' is-active' : ''}`} value='avgdeaths_last7'>avgdeaths_last7</button>
                    <button onClick={handleColumn} className={`button ${avgratedeaths_last7 ? ' is-active' : ''}`} value='avgratedeaths_last7'>avgratedeaths_last7</button>
                    <button onClick={handleColumn} className={`button ${avgtests_last7 ? ' is-active' : ''}`} value='avgtests_last7'>avgtests_last7</button>
                </div>
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