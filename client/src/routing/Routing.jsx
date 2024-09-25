import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import AdminHomePage from '../pages/AdminHomePage'
import EmployeeList from '../pages/EmployeeList'
import AddEmployee from '../pages/AddEmployee'
import EditEmployee from '../pages/EditEmployee'

const Routing = () => {

  let user = localStorage.getItem('userInfo');

  return (
    <Routes>
      <Route path="/" element={ user ? <AdminHomePage /> : <LoginPage /> } />
      <Route path="/dashboard" element={<AdminHomePage />} />
      <Route path="/dashboard/employee-list" element={<EmployeeList />} />
      <Route path='/dashboard/add-employee' element={<AddEmployee />} />
      <Route path='/dashboard/edit-employee/:id' element={<EditEmployee />} />
    </Routes>
  )
}

export default Routing