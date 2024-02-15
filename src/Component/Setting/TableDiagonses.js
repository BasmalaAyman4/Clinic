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
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../Redux/slices/UserSlice';
import AddBranch from './AddBranch';
import AddDiagonses from './AddDiagonses';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import EditDiagonesses from './EditDiagonesses';

const TableDiagonses = () => {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`http://92.205.235.108:8000/clinic/api/diagnoses`, {
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

        axios.delete(`http://92.205.235.108:8000/clinic/api/diagnoses/${item}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                toast.success('diagnoses deleted successfully')
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
            accessorKey: 'diagnoses',
            header: 'Diagnoses',
        },
        {
            accessorFn: (row) => `${row.id}`,
            header: `Action`,
            Cell: ({ renderedCellValue, row, cell }) => (
                <>
                    <div className={`${styles.branch__body}`}>
                        <EditDiagonesses data={row.original} />
                        <p className={`${styles.delete__btn}`} onClick={() => handledelet(row.original.id)}>
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
                        <AddDiagonses />
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

export default TableDiagonses
