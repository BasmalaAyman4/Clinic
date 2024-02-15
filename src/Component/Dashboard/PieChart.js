import React, { useState, useEffect } from 'react'
import ReactApexChart from "react-apexcharts";
import styles from '../../Styles/dashboard.module.css'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
const PieChart = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/patients`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data.data)
                console.log(response.data.data, 'kk')
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    const agesUnder18 = data.filter((obj) => obj.age < 18);
    const agesUnder30 = data.filter((obj) => obj.age < 30);
    const agesUnder50 = data.filter((obj) => obj.age < 50);
    const agesAbove50 = data.filter((obj) => obj.age > 50);

    const [state, setState] = useState({
        series: [agesUnder18?.length, agesUnder30?.length, agesUnder50?.length, agesAbove50?.length],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['under 18', 'under 30', 'under 50', 'above 50'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },

                    theme: {
                        monochrome: {
                            enabled: true
                        }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    })

    return (
        <>
            <div className={`${styles.piechart}`}>
                <h3>Age of Patients</h3>
                <div id="chart">
                    <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
                </div>
                <div id="html-dist"></div>
            </div>
        </>
    )
}

export default PieChart
