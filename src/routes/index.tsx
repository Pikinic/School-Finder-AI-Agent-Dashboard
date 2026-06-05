import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage.js'
import DashboardPage from '../pages/dashboard/DashboardPage.js'
import StudentsPage from '../pages/students/StudentsPage.js'
import ProtectedRoute from './ProtectedRoute.js'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/students' element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes
