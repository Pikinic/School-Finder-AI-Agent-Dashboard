import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage.js'
import DashboardPage from '../pages/dashboard/DashboardPage.js'
import AddProgramPage from '../pages/programs/AddProgramPage.js'
import GlobalAddProgramPage from '../pages/programs/GlobalAddProgramPage.js'
import ProgramsPage from '../pages/programs/ProgramsPage.js'
import EditSchoolPage from '../pages/schools/EditSchoolPage.js'
import SchoolDetailPage from '../pages/schools/SchoolDetailPage.js'
import SchoolsPage from '../pages/schools/SchoolsPage.js'
import StudentDetailPage from '../pages/students/StudentDetailPage.js'
import StudentsPage from '../pages/students/StudentsPage.js'
import ProtectedRoute from './ProtectedRoute.js'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/students' element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
        <Route path='/students/:studentId' element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
        <Route path='/programs' element={<ProtectedRoute><ProgramsPage /></ProtectedRoute>} />
        <Route path='/programs/new' element={<ProtectedRoute><GlobalAddProgramPage /></ProtectedRoute>} />
        <Route path='/schools' element={<ProtectedRoute><SchoolsPage /></ProtectedRoute>} />
        <Route path='/schools/:schoolId/edit' element={<ProtectedRoute><EditSchoolPage /></ProtectedRoute>} />
        <Route path='/schools/:schoolId/programs/new' element={<ProtectedRoute><AddProgramPage /></ProtectedRoute>} />
        <Route path='/schools/:schoolId' element={<ProtectedRoute><SchoolDetailPage /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes
