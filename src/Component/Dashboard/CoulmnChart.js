import React, { useState } from 'react'
import ReactApexChart from "react-apexcharts";
import styles from '../../Styles/dashboard.module.css'

const CoulmnChart = () => {
    const [state, setState] = useState({
        series: [{
            name: 'HBOT',
            data: [44, 55, 41, 67, 22, 43, 21, 49, 22, 43, 21, 49]
        }, {
            name: 'plasma',
            data: [13, 23, 20, 8, 13, 27, 33, 12, 13, 27, 33, 12]
        }, {
            name: 'Physicalthearby',
            data: [11, 17, 15, 15, 21, 14, 15, 13, 21, 14, 15, 13]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                stackType: '100%'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'right',
                offsetX: 0,
                offsetY: 50
            },
        },
    })
    return (
        <>
            <div className={`${styles.coulmnChart}`}>
                <h3>Recent Activities</h3>
                <div id="chart">
                    <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        </>
    )
}

export default CoulmnChart
