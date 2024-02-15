import React, { useState, useReducer } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../../Styles/patient.module.css'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
const EditEmployee = ({ data }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useSelector((state) => state.user);
    const initialState = {
        Name: `${data.name}`,
        email: `${data.email}`,
        phone: `${data.phone}`,
        date: `${data.start_work}`,
        salary: `${data.salary}`,
        birth: `${data.birth_date}`,
        age: `${data.age}`,
        gender: `${data.gender}`,
        address: `${data.salary}`
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
    function finalize(e) {
        e.preventDefault();
        const reqData = {
            name: formData.Name,
            email: formData.email,
            phone: formData.phone,
            start_work: formData.date,
            salary: formData.salary,
            gender: formData.gender,
            birth_date: formData.birth,
            address: formData.address,
            id: data.id
        };
        axios
            .post('http://92.205.235.108:8000/clinic/api/updateEmployee', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('employee edited Successfully');
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
            <p onClick={handleShow}>
                Edit
            </p>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}> Full Name</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="Name"
                                value={formData.Name}
                                onChange={handleChange} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Email</Form.Label>
                                    <Form.Control type="email" placeholder='' className={`${styles.input}`} name="email"
                                        value={formData.email}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="phone"
                                        value={formData.phone}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Start Work</Form.Label>
                                    <Form.Control type="date" placeholder='' className={`${styles.input}`} name="date"
                                        value={formData.date}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Salary</Form.Label>
                                    <Form.Control type="text" placeholder='' className={`${styles.input}`} name="salary"
                                        value={formData.salary}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label className={`${styles.label}`}>Date of birth</Form.Label>
                                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="birth"
                                                value={formData.birth}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label className={`${styles.label}`}>Age</Form.Label>
                                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="age"
                                                value={formData.age}
                                                onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
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



                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Address</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="address"
                                value={formData.address}
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
            <ToastContainer />
        </>
    )
}

export default EditEmployee
