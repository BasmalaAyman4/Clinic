import React, { useState, useReducer, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../../Styles/patient.module.css'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';
const AddPatient = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useSelector((state) => state.user);
    const initialState = {
        name: '',
        phone: '',
        email: '',
        age: '',
        gender: '',
        address: '',
        code: '',
        visit: '',
        state: '',
        doctor: '',
        branch: '',
        diagonses: '',
        note: ''
    };
    function formReducer(state, action) {
        switch (action.type) {
            case 'add':
                return {
                    ...state,
                    [action.field]: action.value
                };
            case 'RESET_FORM':
                return initialState;
            default:
                return state;
        }
    }
    const [formData, dispatch] = useReducer(formReducer, initialState);
    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({
            type: 'add',
            field: name,
            value: value
        });
    }
    const [branch, setBranch] = useState([])
    const [diagnoses, setDiagnoses] = useState([])
    const [doctor, setDoctor] = useState([])
    const Dispatch = useDispatch();
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
    function finalize(e) {
        e.preventDefault();
        const reqData = {
            full_name: formData.name,
            email: formData.email,
            gender: formData.gender,
            phone_number: formData.phone,
            address: formData.address,
            patient_code: formData.code,
            doctor_id: formData.doctor,
            branch_id: formData.branch,
            diagnoses_id: formData.diagonses,
            state: formData.state,
            note: formData.note,
            age: formData.age
        };
        axios
            .post('http://92.205.235.108:8000/clinic/api/patients', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Patients Added Successfully');
                }
                handleClose()
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.response.data.message);

            });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={`${styles.addpatient__btn}`}>
                +Add Patients
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}> Full Name</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="name"
                                value={formData.name}
                                onChange={handleChange} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="phone"
                                        value={formData.phone}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Email</Form.Label>
                                    <Form.Control type="email" placeholder='' className={`${styles.input}`} name="email"
                                        value={formData.email}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Age</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="age"
                                        value={formData.age}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Gender</Form.Label>
                                    <select
                                        placeholder="store"
                                        className={`${styles.select}`}
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value=''>select Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Address</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="address"
                                        value={formData.address}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Patient Code</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="code"
                                        value={formData.code}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>

                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>State</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="state"
                                        value={formData.state}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Doctor</Form.Label>
                                    <select
                                        placeholder="store"
                                        className={`${styles.select}`}
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleChange}
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
                                        value={formData.diagonses}
                                        onChange={handleChange}
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
                                        value={formData.branch}
                                        onChange={handleChange}
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
                                value={formData.note}
                                onChange={handleChange} />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose} className={`${styles.cancel}`}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' className={`${styles.add}`}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddPatient
