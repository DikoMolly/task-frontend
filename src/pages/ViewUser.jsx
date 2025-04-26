import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNotification } from "../context/NotificationContext";
import { userService } from "../services/api";

function ViewUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <div>User not found</div>;

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
