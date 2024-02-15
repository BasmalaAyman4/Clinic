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
import styles from '../../Styles/patient.module.css'
import { Menu, Button, Text, rem } from '@mantine/core';
import dot from '../../assets/images/carbon_overflow-menu-horizontal.png'
import AddPatient from './AddPatient';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import EditPatient from './EditPatient';
const TablePatient = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/patients`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data.data)
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
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'full_name',
            header: 'Name',
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
        },
        {
            accessorKey: 'age',
            header: 'Age',
            filterVariant: 'range',
            filterFn: 'between',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone_number',
            header: 'Phone',
        },
        {
            accessorKey: 'address',
            header: 'Address',
        },
        {
            accessorKey: 'patient_code',
            header: 'Patient Code',
        },
        {
            accessorFn: (row) => `${row.id}`,
            header: `Action`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <div className={`${styles.branch__body}`}>
                        <EditPatient data={row.original}/>
                        <Link to={`/patient-details/${row.original.id}`}>
                            <p className={`${styles.delete__btn}`}>View</p>
                        </Link>
                    </div>
                </>
            ),
        },
    ];
    const table = useMaterialReactTable({
        columns,
        data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
        //MRT display columns can still work, optionally override cell renders with `displayColumnDefOptions`
        enableRowSelection: true,
        initialState: {
            pagination: { pageSize: 8, pageIndex: 0 },
            showGlobalFilter: true,
            showColumnFilters: true
        },
        //customize the MRT components
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 15],
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });
    return (
        <Stack sx={{ m: '2rem 0' }} className={`${styles.stack}`}>
            <Typography variant="h4" className={`${styles.title}`}>Patients</Typography>
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
                    <AddPatient />
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
                                    <TableCell align="center" variant="head" key={header.id} className={`${styles.title}`}>
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
                                    <TableCell align="center" variant="body" key={cell.id} className={`${styles.title}`}>
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
    );
};

export default TablePatient
