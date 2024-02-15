import React, { useRef } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/setting.module.css'
import TableBranch from './TableBranch'
const Branch = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='setting' salesopen='true' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TableBranch />
                </div>
            </section>
        </>
    )
}

export default Branch
