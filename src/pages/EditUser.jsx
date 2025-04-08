import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useNotification } from '../context/NotificationContext'

function EditUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: ''
  })
  const { id } = useParams()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        setUser(response.data.data.user)
      } catch (error) {
        showNotification(error.response?.data?.message || 'Error fetching user', 'error')
        navigate('/users')
      }
    }
    fetchUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/api/users/${id}`, user)
      showNotification('User updated successfully')
      navigate(`/users/${id}`)
    } catch (error) {
      showNotification(error.response?.data?.message || 'Error updating user', 'error')
    }
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={user.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ mr: 1 }}
            >
              Save Changes
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate(`/users/${id}`)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditUser 