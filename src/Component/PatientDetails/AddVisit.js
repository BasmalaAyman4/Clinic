import React, { useState, useReducer, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../../Styles/patientdeatils.module.css'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddVisit = () => {
    const [show, setShow] = useState(false);
    const { token } = useSelector((state) => state.user);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const patientId = useParams()
    const initialState = {
        doctor: '',
        nurse: '',
        date: '',
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
    const [doctor, setDoctor] = useState([])
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
            doctor_id: formData.doctor,
            nurse: formData.nurse,
            visit_date: formData.date,
            note: formData.note,
            patint_id: patientId.id,
            patient_id: patientId.id
        };
        axios
            .post('http://92.205.235.108:8000/clinic/api/vists', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Visit Added Successfully');
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
                +Add Visit
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add Visit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Row>
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
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Nurse</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="nurse"
                                        value={formData.nurse}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>visit Date</Form.Label>
                                    <Form.Control type="date" placeholder='' className={`${styles.input}`} name="date"
                                        value={formData.date}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Session Note</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="note"
                                        value={formData.note}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Button variant="primary" type='submit'>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddVisit
