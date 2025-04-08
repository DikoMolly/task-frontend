import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersList from './pages/UsersList'
import ViewUser from './pages/ViewUser'
import EditUser from './pages/EditUser'
import Navbar from './components/Navbar'
import { Container } from '@mui/material'
import { NotificationProvider } from './context/NotificationContext'
import './App.css'

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<ViewUser />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="/" element={<UsersList />} />
          </Routes>
        </Container>
      </Router>
    </NotificationProvider>
  )
}

export default App
