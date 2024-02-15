import React, { useState, useReducer } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from '../../Styles/patient.module.css'
import { Col, Row } from 'react-bootstrap';
const AddReport = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initialState = {
        price: '',
        productName: '',
        qty: '',
        store: ''
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
    /*  function finalize(e) {
        e.preventDefault();
        const reqData = {
           
        };
        axios
            .post('', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Product Added Successfully');
                }
                handleClose()
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.response.data.message);
 
            });
    } */
    return (
        <>
            <Button variant="primary" onClick={handleShow} className={`${styles.addpatient__btn}`}>
                +Add Reports
            </Button>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Select date</Form.Label>
                                    <Form.Control type="date" placeholder='' className={`${styles.input}`} name="productName"
                                        value={formData.productName}
                                        onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label className={`${styles.label}`}>Day</Form.Label>
                                    <select
                                        placeholder="store"
                                        className={`${styles.select}`}
                                        name="store"
                                        value={formData.store}
                                        onChange={handleChange}
                                    >
                                        <option value=''>select</option>
                                        <option value={1}>Male</option>
                                        <option value={2}>Female</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Branch</Form.Label>
                            <select
                                placeholder="store"
                                className={`${styles.select}`}
                                name="store"
                                value={formData.store}
                                onChange={handleChange}
                            >
                                <option value=''>select</option>
                                <option value={1}>Male</option>
                                <option value={2}>Female</option>
                            </select>
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

export default AddReport
