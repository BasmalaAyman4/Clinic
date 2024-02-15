import React, { useState, useReducer, useEffect, useRef } from 'react'
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

const AddMedical = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { token } = useSelector((state) => state.user);
    const patientId = useParams()
    const initialState = {
        diagnoses: ''
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
    const [pdfData, setPdfData] = useState({

    })
    const addFile = useRef(null)
    const addFileInput = useRef(null)
    const imageContentRef = useRef(null);
    const imageFirmRef = useRef(null);
    const [imageUrl, setImage] = useState(null)
    function handleLogo() {
        let inputFileEvent = document.querySelector(".input-file-js")
        inputFileEvent.click()
    }
    let previewUploadFile = (e) => {
        let file = e.target.files[0];
        if (!file) {
            return;
        }
        setPdfData(prevValue => {
            return {
                ...prevValue,
                file: file
            }
        })
    }
    const [diagnoses, setDiagnoses] = useState([])
    const Dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/diagnoses`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
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
    function finalize(e) {
        e.preventDefault();
        const reqData = {
            patient_id: patientId.id,
            file: pdfData.file,
            treatment: formData.diagnoses
        };
        axios
            .post('http://92.205.235.108:8000/clinic/api/addReport', reqData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if (response.data.status == 200) {
                    toast.success('Report Added Successfully');
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
            <div className={`${styles.medical__btn}`}>
                <Button variant="primary" onClick={handleShow} className={`${styles.addpatient__btn}`}>
                    +Add Medical Reports
                </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className={`${styles.label}`}>Add Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Form onSubmit={(e) => finalize(e)}> */}
                    <Form onSubmit={(e) => finalize(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className={`${styles.label}`}>Type of Diagnoses</Form.Label>
                            <select
                                placeholder="Diagnoses"
                                className={`${styles.select}`}
                                name="diagnoses"
                                value={formData.diagnoses}
                                onChange={handleChange}
                            >
                                <option value=''>select Diagnoses</option>
                                {
                                    diagnoses.map(item => (
                                        <>
                                            <option value={item.diagnoses}>{item.diagnoses}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </Form.Group>
                        <Form.Group className={`${styles["questionMark__container"]} mb-3`} controlId="" >
                            <Form.Control
                                name="file"
                                className={`${styles.input} ${styles.question}`}
                                placeholder="PDF"
                                type='file'
                                ref={(e) => { addFileInput.current = e }}
                                onChange={(e) => { previewUploadFile(e) }}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default AddMedical
