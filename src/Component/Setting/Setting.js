import React, { useRef } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/setting.module.css'
import TableSetting from './TableSetting'
const Setting = () => {
    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='setting' salesopen='true' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <TableSetting />
                </div>
            </section>
        </>
    )
}

export default Setting
