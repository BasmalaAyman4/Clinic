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
const AddSession = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useSelector((state) => state.user);
    const patientId = useParams()
    const initialState = {
        service: '',
        price: '',
        number: '',
        status: '',
        total: '',
        paid: ''
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
    const [service, setService] = useState([])
    const Dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/service`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setService(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    Dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    function finalize(e) {
        e.preventDefault();
        const reqData = {
            service_type_id: formData.service,
            price: formData.price,
            number_of_sessions: formData.number,
            status: formData.status,
            total: formData.total,
            paid: formData.paid,
            patint_id: patientId.id
        };
        axios
            .post('http://92.205.235.108:8000/clinic/api/sessions', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Session Added Successfully');
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
                +Add Sessions
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Type of Services</Form.Label>
                            <select
                                placeholder="service"
                                className={`${styles.select}`}
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value=''>select Services</option>
                                {
                                    service.map(item => (
                                        <>
                                            <option value={item.id}>{item.service}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Price</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="price"
                                        value={formData.price}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>No.of services</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="number"
                                        value={formData.number}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Status</Form.Label>
                                    <select
                                        placeholder="status"
                                        className={`${styles.select}`}
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value=''>select Status</option>
                                        <option value='paid'>Paid</option>
                                        <option value='unpaid'>Unpaid</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Total Price</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="total"
                                        value={formData.total}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Paid</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="paid"
                                        value={formData.paid}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
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

export default AddSession
