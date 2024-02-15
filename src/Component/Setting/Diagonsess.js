import React, { useRef } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/setting.module.css'
import TableDiagonses from './TableDiagonses'
const Diagonsess = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='setting' salesopen='true' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TableDiagonses />
                </div>
            </section>
        </>
    )
}

export default Diagonsess
