import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/employees.module.css'
import TableEmployee from './TableEmployee'
const Employees = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='employees' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TableEmployee />
                </div>
            </section>
        </>
    )
}

export default Employees
