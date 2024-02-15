import React, { useState, useReducer, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Col, Row } from 'react-bootstrap';
import file from '../../assets/images/download (1).png'
import styles from '../../Styles/patientdeatils.module.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { logout } from '../../Redux/slices/UserSlice';
import AddSession from './AddSession';
import AddMedical from './AddMedical';
import ExamplePdf from '../../assets/images/Basmala-Ayman.pdf'
import { Link } from 'react-router-dom';
import moment from 'moment';
const UpdatePatient = () => {
    const { token } = useSelector((state) => state.user);
    const patientId = useParams()
    const [patient, setPatient] = useState([])
    const [reports, setReport] = useState([])
    const Dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/getPatientById/${patientId.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setPatient(response.data.data)
                setReport(response.data.data.reports)
                console.log(response.data.data.reports)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    Dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])


    const [branch, setBranch] = useState([])
    const [diagnoses, setDiagnoses] = useState([])
    const [doctor, setDoctor] = useState([])
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/branch`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setBranch(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    Dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])

    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/diagnoses`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setDiagnoses(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    Dispatch(logout());
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
                    Dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    return (
        <>
            <Form>
                <div className={`${styles.details}`}>
                    <h3>Patient details</h3>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className={`${styles.label}`}> Full Name</Form.Label>
                        <Form.Control type="text" placeholder='' className={`${styles.input}`} name="name"
                            value={patient.full_name}
                            readOnly />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="phone"
                                    value={patient.phone_number}
                                    readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Email</Form.Label>
                                <Form.Control type="email" placeholder='' className={`${styles.input}`} name="email"
                                    value={patient.email}
                                    readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Age</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="age"
                                    value={patient.age}
                                    readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Gender</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="gender"
                                    value={patient.gender}
                                    readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Address</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="address"
                                    value={patient.address}
                                    readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Patient Code</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="code"
                                    value={patient.patient_code}
                                    readOnly />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>State</Form.Label>
                                <Form.Control type="text" placeholder='' className={`${styles.input}`} name="state"
                                    value={patient.state}
                                    readOnly />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Doctor</Form.Label>
                                <select
                                    placeholder="store"
                                    className={`${styles.select}`}
                                    name="doctor"
                                    value={patient.doctor_id}
                                    readOnly
                                >
                                    <option value=''>select Doctor</option>
                                    {
                                        doctor.map(item => (
                                            <>
                                                <option value={item.id}>{item.name}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Diognoses</Form.Label>
                                <select
                                    placeholder="store"
                                    className={`${styles.select}`}
                                    name="diagonses"
                                    value={patient.diagnoses_id}
                                    readOnly
                                >
                                    <option value=''>select Diognoses</option>
                                    {
                                        diagnoses.map(item => (
                                            <>
                                                <option value={item.id}>{item.diagnoses}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className={`${styles.label}`}>Branch</Form.Label>
                                <select
                                    placeholder="Branch"
                                    className={`${styles.select}`}
                                    name="branch"
                                    value={patient.branch_id}
                                    readOnly
                                >
                                    <option value=''>select Branch</option>
                                    {
                                        branch.map(item => (
                                            <>
                                                <option value={item.id}>{item.branch}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className={`${styles.label}`}>Notes</Form.Label>
                        <Form.Control type="text" placeholder='' className={`${styles.input}`} name="note"
                            value={patient.note}
                            readOnly />
                    </Form.Group>
                </div>
                <Form>
                    <AddMedical />
                    <div className={`${styles.medical}`}>
                        <h3>Medical Reports</h3>
                        <div className={`${styles.table}`}>
                            <h5>Treatment</h5>
                            <h5>Date&Time</h5>
                            <h5>Attachment</h5>
                        </div>
                        {
                            reports.map(repo => (
                                <>
                                    <div className={`${styles.table__body}`}>
                                        <p>{repo?.treatment}</p>
                                        <p>{moment(repo?.created_at).format('lll')}</p>
                                        <Link
                                            to={`http://127.0.0.1:8000/files/${repo?.file}`}
                                            download="Example-PDF-document"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img alt='' src={file} />
                                        </Link>

                                    </div>
                                </>
                            ))
                        }
                    </div>

                </Form>
            </Form >
        </>
    )
}

export default UpdatePatient
