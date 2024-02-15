import React, { useRef } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/setting.module.css'
import TableService from './TableService'
const Service = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='setting' salesopen='true' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TableService />
                </div>
            </section>

        </>
    )
}

export default Service
