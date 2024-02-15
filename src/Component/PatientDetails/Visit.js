import React, { useState, useEffect } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/patientdeatils.module.css'
import TableVisit from './TableVisit'
const Visit = () => {
  return (
    <>
          <section className={`${styles.home}`}>

              <Sidebar active='patients' />
              <div className={`${styles.homeContainer}`}>
                  <Nav />
                  <TableVisit/>
                  </div>
                  </section>
    </>
  )
}

export default Visit
