import React,{useState,useEffect} from 'react'
import styles from '../../Styles/dashboard.module.css'
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
const TableCom = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/employees`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data.data)
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 401) {
                    localStorage.clear();
                    dispatch(logout());
                    window.location.reload();
                }
            })
    }, [])
    const firstThreeObjects = data.slice(0, 3);
    return (
        <>
            <div className={`${styles.tabs}`}>
                <Table bordered hover>
                    <thead className={`${styles.thead}`}>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Date</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            firstThreeObjects.map(emp=>(
                                <>
                                    <tr>
                                        <td>{emp.name}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.start_work}</td>
                                        <td>{emp.salary}</td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableCom
