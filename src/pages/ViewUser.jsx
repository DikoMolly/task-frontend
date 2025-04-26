import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNotification } from "../context/NotificationContext";

function ViewUser() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        setUser(response.data.data.user);
      } catch (error) {
        showNotification(
          error.response?.data?.message || "Error fetching user",
          "error"
        );
        navigate("/users");
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Details
        </Typography>
        <Typography>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography>
          <strong>Role:</strong> {user.role}
        </Typography>
        <Typography>
          <strong>Created At:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/users/${id}/edit`)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button variant="outlined" onClick={() => navigate("/users")}>
            Back to List
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ViewUser;
