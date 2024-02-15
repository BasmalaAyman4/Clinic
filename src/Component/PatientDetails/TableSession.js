import React, { useEffect, useState } from 'react'
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
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { useParams } from 'react-router-dom';
/* const handledelet = (item) => {
    axios.get(``, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {
            toast.success(response.data.message)
            window.location.reload();

        }
        ).catch((err) => { toast.error(err) })

}; */

const TableSession = () => {
    const patientId = useParams()
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/sessions/${patientId.id}`, {
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
            accessorKey: 'service.service',
            header: 'Type of services',
        },
        {
            accessorKey: 'price',
            header: 'price',
        },
        {
            accessorKey: 'number_of_sessions',
            header: 'No.of sessions',
        },
        {
            accessorFn: (row) => `${row.state}`,
            header: `Status`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <div>
                        <p className={`${row.original.status}`}>{row.original.status}</p>
                    </div>
                </>
            ),
        },
        {
            accessorKey: 'total',
            header: 'Total Price',
        },
        {
            accessorFn: (row) => `${row.id}`,
            header: `Action`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <div className={`${styles.branch__body}`}>
                        <EditSession data={row.original} />
                        <Link to={`/visit/${patientId.id}/${row.original.id}`} className={`${styles.delete__btn}`}>
                            Visit
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
                        <AddSession />
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
        </>
    )
}

export default TableSession
