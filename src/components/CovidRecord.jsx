/**
 * Author: Jongil Yoon
 */
import React from 'react'


/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function CovidRecord({ data }) {

    /**
     * 
     */
    return (
        <tr>
            <th>{data.pruid}</th>
            <th>{data.prname}</th>
            <th>{data.prnameFR}</th>
            <th>{data.date}</th>
            <th>{data.update}</th>
            <th>{data.numconf}</th>
            <th>{data.numprob}</th>
            <th>{data.numdeaths}</th>
            <th>{data.numtotal}</th>
            <th>{data.numtested}</th>
            <th>{data.numtests}</th>
            <th>{data.numrecover}</th>
            <th>{data.percentrecover}</th>
            <th>{data.ratetested}</th>
            <th>{data.ratetests}</th>
            <th>{data.numtoday}</th>
            <th>{data.percentoday}</th>
            <th>{data.ratetotal}</th>
            <th>{data.ratedeaths}</th>
            <th>{data.numdeathstoday}</th>
            <th>{data.percentdeath}</th>
            <th>{data.numtestedtoday}</th>
            <th>{data.numteststoday}</th>
            <th>{data.numrecoveredtoday}</th>
            <th>{data.percentactive}</th>
            <th>{data.numactive}</th>
            <th>{data.rateactive}</th>
            <th>{data.numtotal_last14}</th>
            <th>{data.ratetotal_last14}</th>
            <th>{data.numdeaths_last14}</th>
            <th>{data.ratedeaths_last14}</th>
            <th>{data.numtotal_last7}</th>
            <th>{data.ratetotal_last7}</th>
            <th>{data.numdeaths_last7}</th>
            <th>{data.ratedeaths_last7}</th>
            <th>{data.avgtotal_last7}</th>
            <th>{data.avgincidence_last7}</th>
            <th>{data.avgdeaths_last7}</th>
            <th>{data.avgratedeaths_last7}</th>
            <th>{data.avgtests_last7}</th>
        </tr>
    )

}
