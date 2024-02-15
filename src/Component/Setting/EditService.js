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
const EditService = ({ data }) => {
    const [show, setShow] = useState(false);
    const { token } = useSelector((state) => state.user);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initialState = {
        name: `${data.service}`,
        price: `${data.price}`
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
            service: formData.name,
            price: formData.price
        };
        axios
            .post(`http://92.205.235.108:8000/clinic/api/service/${data.id}`, reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Service Added Successfully');
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
            <p variant="primary" onClick={handleShow} className={`${styles.delete__btn}`}>
                Edit
            </p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>service name</Form.Label>
                            <Form.Control type="text" placeholder='' className={`${styles.input}`} name="name"
                                value={formData.name}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>service price</Form.Label>
                            <Form.Control type="number" placeholder='' className={`${styles.input}`} name="price"
                                value={formData.price}
                                onChange={handleChange} />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose} className={`${styles.cancel}`}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' className={`${styles.add}`}>
                            Edit service
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
            <ToastContainer />
        </>
    )
}

export default EditService
