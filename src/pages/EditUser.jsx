import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import { useNotification } from "../context/NotificationContext";
import { userService } from "../services/api";

function EditUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await userService.getUserById(id);
        setUser(response.data.user);
      } catch (error) {
        showNotification(
          error.response?.data?.message || "Error fetching user",
          "error"
        );
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await userService.updateUser(id, user);
      showNotification("User updated successfully");
      navigate(`/users/${id}`);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Error updating user",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );

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
              disabled={submitting}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/users/${id}`)}
              disabled={submitting}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default EditUser;
