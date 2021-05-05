import React, { lazy, Suspense } from "react"
import CovidChart from "./CovidChart"

const CovidTable = lazy(() => import('./CovidTable'))

export default function Charts() {
  return (
    <>
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <h3 className="title is-2">COVID-19</h3>
            <h4 className="subtitle is-5">Cross Country COVID-19 Data in Canada</h4>
          </div>

          <br />

          <div className="container">
            <CovidChart />
          </div>

        </div>
      </section>
      <section className="section">
        <div className="container">

          <div className="section-heading">
            <h3 className="title is-2">Original Data</h3>
            <h4 className="subtitle is-5">open data from federal government
              <span>
                <a href='https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection.html?topic=tilelink'>
                  &nbsp;
                  link
                </a>
              </span>
            </h4>
          </div>

          <br />

          <div className="container">
            <Suspense fallback={null}>
              <CovidTable />
            </Suspense>
          </div>

        </div>
      </section>
    </>
  )
}