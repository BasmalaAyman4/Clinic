import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/patient.module.css'
import TablePatient from './TablePatient'
const Patients = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='patients' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TablePatient />
                </div>
            </section>
        </>
    )
}

export default Patients
