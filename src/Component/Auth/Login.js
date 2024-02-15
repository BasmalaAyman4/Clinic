import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/slices/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import style from '../../Styles/login.module.css'
import { Col, Row, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/images/LOGO.png'
const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, error } = useSelector((state) => state.user);
    const formRef = useRef(null);
    function login(e) {
        e.preventDefault();
        let userCredentials = {
            email, password
        }
        toast.loading('...loading')
        dispatch(loginUser(userCredentials)).then((result) => {
            if (result.payload) {
                toast.success('success')
                navigate('/')
                setEmail('');
                setPassword('');
            }
            else {
                toast.error(error)
            }
        })
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            login(e);
        }
    };

    return (
        <>
            <Container>
                <section className={`${style.loginpage}`}>
                    <Row className={`${style.row}`}>
                        <Col className={`${style.login__form}`}>
                            <div className={`${style.logouto}`}>
                            <img alt='' src={logo} className={`${style.logoform}`}/>
                            </div>
                            <h3 className={`${style.signin__title}`}>Sign in</h3>
                            <div className={`${style.signin__form}`}>
                                <Form.Group className="mb-3 " controlId="email">
                                    <Form.Label className={`${style.label}`}>UserName</Form.Label>
                                    <Form.Control name="email" type='text' autoComplete="off" placeholder='Enter your username' className={`${style.full}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3 mt-4 " controlId="password">
                                    <Form.Label className={`${style.label}`}>Password</Form.Label>
                                    <Form.Control name="password" type='password' autoComplete="off" placeholder='Enter your password' className={`${style.full}`} value={password} onChange={(e) => setPassword(e.target.value)} ref={formRef}
                                        onKeyPress={handleKeyPress} />
                                </Form.Group>
                                
                                <div className={`${style.btns}`}>
                                    <button className={style.log__btn} type='button' onClick={login}>Login</button>
                                </div>
                            </div>
                        </Col>

                    </Row>
                    <ToastContainer />
                </section>
            </Container>
        </>
    )
}

export default Login
