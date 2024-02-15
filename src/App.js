import { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { useDispatch } from 'react-redux';
import { login } from './Redux/slices/UserSlice';
import Protectpages from './Component/ProtectPage'
import Login from './Component/Auth/Login';
import Patients from './Component/Patients/Patients';
import PatientDetails from './Component/PatientDetails/PatientDetails'
import 'bootstrap/dist/css/bootstrap.min.css';
import Employees from './Component/Employees/Employees';
import Report from './Component/Reporting/Report';
import Setting from './Component/Setting/Setting';
import Dashboard from './Component/Dashboard/Dashboard';
import Branch from './Component/Setting/Branch';
import Diagonsess from './Component/Setting/Diagonsess';
import Service from './Component/Setting/Service';
import Visit from './Component/PatientDetails/Visit';
import GG from './Component/gg';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const usertoken = localStorage.getItem('token');
    if (usertoken) {
      try {
        const parsedToken = JSON.parse(usertoken);
        const userName = localStorage.getItem('userName');
        dispatch(login(parsedToken, userName));
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, [dispatch]);
  return (
    <MantineProvider>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route element={<Protectpages />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/patients' element={<Patients />} />
              <Route path='/patient-details/:id' element={<PatientDetails />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/reports' element={<Report />} />
              <Route path='/setting' element={<Setting />} />
              <Route path='/branch' element={<Branch />} />
              <Route path='/diagnoses' element={<Diagonsess />} />
              <Route path='/service' element={<Service />} />
              <Route path='/visit/:pid/:sid' element={<Visit />} />
              <Route path='/gg' element={<GG />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MantineProvider>
  );
}

export default App;
