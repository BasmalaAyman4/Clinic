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
import styles from '../../Styles/employees.module.css'
import { Popover, Button, Text, rem } from '@mantine/core';
import dot from '../../assets/images/carbon_overflow-menu-horizontal.png'
import { Link } from 'react-router-dom';
import AddPatient from '../Patients/AddPatient';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';


const TableEmployee = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(Array(data.length).fill(false));
    const handleClick = (index) => {
        setToggle(prevToggle => {
            const newToggle = [...prevToggle];
            newToggle[index] = !newToggle[index];
            return newToggle;
        });
    };

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
    const handledelet = (item) => {
        const reqData = {
            id: item
        };
        axios.post(`http://92.205.235.108:8000/clinic/api/deleteEmployee`, reqData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                toast.success('Employee deleted successfully')
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
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone',
            header: 'Pone Number',
        },
        {
            accessorKey: 'start_work',
            header: 'Work starting date',
        },
        {
            accessorKey: 'salary',
            header: 'Salary',
        },

        {
            accessorKey: 'gender',
            header: 'Gender',
        },
        {
            accessorKey: 'birth_date',
            header: 'Birthday',
        },
        {
            accessorFn: (row) => `${row.id}`,
            header: `Action`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <img alt='' src={dot} onClick={() => handleClick(row.original.id)} className={`${styles.edit__bodyImg}`} />
                    {toggle[row.original.id] ?
                        <div className={`${styles.edit__body}`}>
                            <EditEmployee data={row.original} />
                            <hr />
                            <p onClick={() => handledelet(row.original.id)}>Delete</p>
                        </div>
                        :
                        ""
                    }

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
                <Typography variant="h4" className={`${styles.title}`}>Employees</Typography>
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
                        <AddEmployee />
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

export default TableEmployee
