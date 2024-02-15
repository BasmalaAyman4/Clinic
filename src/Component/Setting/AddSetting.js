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
const AddSetting = () => {
    const [show, setShow] = useState(false);
    const { token } = useSelector((state) => state.user);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initialState = {
        job: '',
        name: '',
        email: '',
        password: ''
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
            name: formData.name,
            email: formData.email,
            password: formData.password,
            job: formData.job
        };
        axios
            .post('http://127.0.0.1:8000/api/addUser', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('User Added Successfully');
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
                +Add Users
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Job</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="job"
                                value={formData.job}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}> User Name</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="name"
                                value={formData.name}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Email</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="email"
                                value={formData.email}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>password</Form.Label>
                            <Form.Control type="password" placeholder='' className={`${styles.input}`} name="password"
                                value={formData.password}
                                onChange={handleChange} />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose} className={`${styles.cancel}`}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' className={`${styles.add}`}>
                            Add user
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddSetting
