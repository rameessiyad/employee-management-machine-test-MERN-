import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import AdminHomePage from '../pages/AdminHomePage'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<AdminHomePage />} />
    </Routes>
  )
}

export default Routing