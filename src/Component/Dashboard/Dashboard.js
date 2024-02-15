import React,{useState,useEffect} from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/dashboard.module.css'
import { Col, Row } from 'react-bootstrap'
import patientim from '../../assets/images/Group 1000001793.png'
import appoiment from '../../assets/images/Group 1000001791.png'
import stuff from '../../assets/images/Group 1000001795.png'
import PieChart from './PieChart'
import CoulmnChart from './CoulmnChart'
import TableCom from './Table'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
const Dashboard = () => {
    const { token } = useSelector((state) => state.user);
    const [patient, setPatient] = useState([])
    const [employee, setEmployee] = useState([])
    const [doctor, setDoctor] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/patients`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setPatient(response.data.data)
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
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/employees`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setEmployee(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/doctors`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setDoctor(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='dashboard' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <Row className={`${styles.row}`}>
                        <Col xxl='8'>
                            <div className={`${styles.numbers}`}>
                                <div className={`${styles.number__body}`}>
                                    <img alt='' src={patientim} />
                                    <div>
                                        <h3>{patient.length}</h3>
                                        <p>Total Patients</p>
                                    </div>
                                </div>
                                <div className={`${styles.number__body}`}>
                                    <img alt='' src={appoiment} />
                                    <div>
                                        <h3>{employee.length}</h3>
                                        <p>Total Stuff</p>
                                    </div>
                                </div>
                                <div className={`${styles.number__body}`}>
                                    <img alt='' src={stuff} />
                                    <div>
                                        <h3>{doctor.length}</h3>
                                        <p>Total Doctors</p>
                                    </div>
                                </div>
                            </div>
                            <CoulmnChart />
                            <TableCom />
                        </Col>

                        <Col xxl='4'>
                            <PieChart />
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}

export default Dashboard
