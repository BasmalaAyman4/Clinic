import React, { useState, useEffect } from 'react'
import {
    MRT_GlobalFilterTextField,
    MRT_TableBodyCellValue,
    MRT_TablePagination,
    MRT_ToolbarAlertBanner,
    flexRender,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import d from '../../assets/images/delete (1) 1.svg'
import styles from '../../Styles/patient.module.css'
import { Menu, Button, Text, rem } from '@mantine/core';
import dot from '../../assets/images/carbon_overflow-menu-horizontal.png'
import { Link } from 'react-router-dom';
import AddSession from './AddSession';
import EditSession from './EditSession';
import AddVisit from './AddVisit';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { useParams } from 'react-router-dom';


const TableVisit = () => {
    const patientId = useParams()
    const { token } = useSelector((state) => state.user);
    const [visit, setVisit] = useState([])
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const [doctor, setDoctor] = useState([])
    useEffect(() => {
        const reqData = {
            patient_id: patientId.id,
        };
        axios.post(`http://92.205.235.108:8000/clinic/api/getVists`, reqData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            }
        })
            .then((response) => {
                setVisit(response.data.data)
                console.log(response.data.data, 'kk')
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
                console.log(response.data.data)
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
        const patientsWithDoctorName = visit.map((patient) => {
            const doctorn = doctor.find((doctor) => doctor.id === patient.doctor_id);
            return {
                ...patient,
                doctorName: doctorn ? doctorn.name : 'Unknown Doctor'
            };
        });
        setData(patientsWithDoctorName)
    }, [visit, doctor])
    const columns = [
        {
            accessorKey: 'doctorName',
            header: 'Dr.Observer',
        },
        {
            accessorKey: 'nurse',
            header: 'Nurse',
        },
        {
            accessorKey: 'visit_date',
            header: 'First Visit',
        },
        {
            accessorKey: 'note',
            header: 'Notes',
        },

    ];
    const table = useMaterialReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
        enableRowSelection: true,
        initialState: {
            pagination: { pageSize: 4, pageIndex: 0 },
            showGlobalFilter: true,
        },
        //customize the MRT components
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 15],
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });
    return (
        <>
            <Stack sx={{ m: '2rem 0' }} className={`${styles.stack}`}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/**
         * Use MRT components along side your own markup.
         * They just need the `table` instance passed as a prop to work!
         */}
                    <MRT_GlobalFilterTextField table={table} className={`${styles.input}`} />
                    <div>
                        <AddVisit />
                        <MRT_TablePagination table={table} />
                    </div>
                </Box>
                {/* Using Vanilla Material-UI Table components here */}
                <TableContainer>
                    <Table className={`${styles.table}`}>
                        {/* Use your own markup, customize however you want using the power of TanStack Table */}
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell align="center" variant="head" key={header.id} className={`${styles.title} visit__title`}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.Header ??
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} selected={row.getIsSelected()}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell align="center" variant="body" key={cell.id} className={`${styles.title} visit__title`}>
                                            {/* Use MRT's cell renderer that provides better logic than flexRender */}
                                            <MRT_TableBodyCellValue cell={cell} table={table} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
            </Stack>
        </>
    )
}

export default TableVisit
