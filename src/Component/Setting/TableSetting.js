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
import styles from '../../Styles/setting.module.css'
import { Popover, Button, Text, rem } from '@mantine/core';
import dot from '../../assets/images/carbon_overflow-menu-horizontal.png'
import { Link } from 'react-router-dom';
import AddSetting from './AddSetting';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import EditSetting from './EditSetting';


const TableSetting = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setData(response.data.data)
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
    const handledelet = (item) => {
        const reqData = {
            id: item
        };
        axios.post(`http://92.205.235.108:8000/clinic/api/deleteUser`, reqData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                toast.success('user deleted successfully')
                window.location.reload();

            }
            ).catch((err) => {
                if (err.response.data.status === 500) {
                    alert('you should delete product first')
                }
            })
    };
    const columns = [
        {
            accessorKey: 'job',
            header: 'Job',
        },
        {
            accessorKey: 'name',
            header: 'Full Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorFn: (row) => `${row.id}`,
            header: `Action`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <div className={`${styles.branch__body}`}>
                        <p className={`${styles.delete__btn}`} onClick={() => handledelet(row.original.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <path d="M7.89929 1.25C6.86902 1.25 6.02429 2.09473 6.02429 3.125H2.74304C2.57459 3.12256 2.41711 3.21167 2.33167 3.35693C2.24622 3.50342 2.24622 3.68408 2.33167 3.83057C2.41711 3.97583 2.57459 4.06494 2.74304 4.0625H3.52429V12.0312C3.52429 12.9785 4.29578 13.75 5.24304 13.75H10.5555C11.5028 13.75 12.2743 12.9785 12.2743 12.0312V4.0625H13.0555C13.224 4.06494 13.3815 3.97583 13.4669 3.83057C13.5524 3.68408 13.5524 3.50342 13.4669 3.35693C13.3815 3.21167 13.224 3.12256 13.0555 3.125H9.77429C9.77429 2.09473 8.92957 1.25 7.89929 1.25ZM7.89929 2.1875C8.42297 2.1875 8.83679 2.60132 8.83679 3.125H6.96179C6.96179 2.60132 7.37561 2.1875 7.89929 2.1875ZM6.49304 5.625C6.75183 5.625 6.96179 5.83496 6.96179 6.09375V10.7812C6.96179 11.04 6.75183 11.25 6.49304 11.25C6.23425 11.25 6.02429 11.04 6.02429 10.7812V6.09375C6.02429 5.83496 6.23425 5.625 6.49304 5.625ZM9.30554 5.625C9.56433 5.625 9.77429 5.83496 9.77429 6.09375V10.7812C9.77429 11.04 9.56433 11.25 9.30554 11.25C9.04675 11.25 8.83679 11.04 8.83679 10.7812V6.09375C8.83679 5.83496 9.04675 5.625 9.30554 5.625Z" fill="white" />
                            </svg>
                            Delete
                        </p>
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
                <Typography variant="h4" className={`${styles.title}`}>Account Setting</Typography>
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
                        <AddSetting />
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

export default TableSetting
