import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/patientdeatils.module.css'
import { useParams } from 'react-router-dom';
import UpdatePatient from './UpdatePatient';
import TableSession from './TableSession';
import TableVisit from './TableVisit';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';
const PatientDetails = () => {
    const patientId = useParams()
    const [active, setActive] = useState('personal')
    const [patient, setPatient] = useState([])
    const Dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/getPatientById/${patientId.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setPatient(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    Dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    return (
        <>
            <section className={`${styles.home}`}>

                <Sidebar active='patients' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <h3 className={`${styles.patient__title}`}>Patient details</h3>
                    <div className={`${styles.user__body}`}>
                        <h3>{patient?.full_name}</h3>
                        <p>Patient</p>
                    </div>
                    <div>
                        <div className={`${styles.active__body}`}>
                            <p className={`${active === 'personal' ? styles.active : styles.para}`} onClick={() => setActive('personal')}>Personal details</p>
                            <p className={`${active === 'sessions' ? styles.active : styles.para}`} onClick={() => setActive('sessions')}>Sessions</p>
                            <p className={`${active === 'visit' ? styles.active : styles.para}`} onClick={() => setActive('visit')}>Visit</p>

                        </div>
                    </div>
                    {
                        active === 'personal' ?

                            <UpdatePatient />
                            :
                            ''
                    }
                    {
                        active === 'sessions' ?
                            <TableSession />
                            :
                            ''
                    }
                    {
                        active === 'visit' ?
                            <TableVisit />
                            :
                            ''
                    }
                </div>
            </section>
        </>
    )
}

export default PatientDetails
