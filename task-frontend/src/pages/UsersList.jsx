import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNotification } from "../context/NotificationContext";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users`, {
        params: {
          page,
          search,
          limit: 5,
        },
      });
      setUsers(response.data.data.users);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Error fetching users",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userToDelete._id}`);
      showNotification("User deleted successfully");
      fetchUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      showNotification(
        error.response?.data?.message || "Error deleting user",
        "error"
      );
    }
  };

  return (
    <div>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <TextField
          label="Search users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/users/${user._id}`)}>
                    <Visibility />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/users/${user._id}/edit`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete user{" "}
            {userToDelete ? `"${userToDelete.name}"` : ""}? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersList;
