import React, { useRef } from 'react'
import Sidebar from '../../Layout/Sidebar'
import Nav from '../../Layout/Nav'
import styles from '../../Styles/report.module.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AddReport from './AddReport';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
const Report = () => {
    const pdfRef = useRef();
    const downloadPDF = () => {
        const input = pdfRef.current;
        // Change the background color before capturing the content
        const originalBackgroundColor = input.style.backgroundColor;
        input.style.backgroundColor = '#000D26'; // Set the desired background color
        html2canvas(input).then((canvas) => {
            input.style.backgroundColor = originalBackgroundColor;
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('report.pdf')
        })
    }


    return (
        <>
            <section className={`${styles.home}`}>
                <Sidebar active='reports' />
                <div className={`${styles.homeContainer}`}>
                    <Nav />
                    <div ref={pdfRef} className={`${styles.reports}`}>
                        <div className={`${styles.report}`}>
                            <h3>Reporting</h3>
                            <div className={`${styles.report__btn}`}>
                                <button onClick={downloadPDF} className={`${styles.export__btn}`}>Export</button>
                                <AddReport />
                            </div>
                        </div>
                        <div className={`${styles.report__details}`}>
                            <div>
                                <h3>Day</h3>
                                <p>Sunday</p>
                            </div>
                            <div>
                                <h3>Date</h3>
                                <p>17Dec,2023</p>
                            </div>
                            <div>
                                <h3>Branch</h3>
                                <p>Giza,Fesal</p>
                            </div>
                        </div>
                        <div>
                            <Row className={`${styles.row}`}>
                                <Col>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Rectal sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Local sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Minor sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Major sessions</h3>
                                        <p>0</p>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Beg sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Ear sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Plasme sessions</h3>
                                        <p>0</p>
                                    </div>
                                    <div className={`${styles.report__numbers}`}>
                                        <h3>Number of Physiotherapy sessions</h3>
                                        <p>0</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row className={styles.row}>
                                <Col>
                                    <div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Cash revenue</h3>
                                            <p>0</p>
                                        </div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Fawray revenue</h3>
                                            <p>0</p>
                                        </div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Vodafone revenue</h3>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <hr className={`${styles.hr}`} />
                                    <div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Total revenue</h3>
                                            <p>0</p>
                                        </div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Total expenses</h3>
                                            <p>0</p>
                                        </div>
                                        <div className={`${styles.report__numbers}`}>
                                            <h3>Cash after deducting expenses</h3>
                                            <p>0</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={`${styles.expenses__body}`}>
                                        <h3>Expenses</h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={`${styles.tabs}`}>
                            <Table bordered hover>
                                <thead className={`${styles.thead}`}>
                                    <tr>
                                        <th>Nursing name</th>
                                        <th>No.of caceses</th>
                                        <th>Nursing name</th>
                                        <th>No.of caceses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default Report
