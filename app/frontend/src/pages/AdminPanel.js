import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Box, Button, TextField, Typography, CircularProgress, Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"; // For navigation

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-user/${id}`);
      setSuccess("User deleted successfully.");
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/admin/create-user", newUser);
      setSuccess("User created successfully.");
      fetchUsers();
      handleClose();
    } catch (err) {
      setError("Error creating user.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear authentication tokens or user data here (if applicable)
    // For example, remove token from localStorage or state management
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/");
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.id)}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Delete"}
        </Button>
      ),
      width: 150,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
        Admin Panel
      </Typography>
      <div style={{ width: '100%', display: 'flex', justifyContent:"space-between" }}>
      <Button 
  variant="contained" 
  color="primary" 
  style={{ margin: '0 4px', width: '170px', padding: '4px 8px', fontSize: '0.85rem' }}
  onClick={handleOpen}
>
Create New User
</Button>
<Button 
  variant="contained" 
  color="secondary" 
  style={{ margin: '0 4px', width: '120px', padding: '4px 8px', fontSize: '0.85rem', background:"#d32f2f" }}
  onClick={handleLogout}
>
  Log Out
</Button>


</div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users.map((user) => ({
            id: user._id,
            name: user.name,
            email: user.email,
          }))}
          columns={columns}
          pageSize={5}
        />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Create New User
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                name: e.target.value,
                role: e.target.value === "Yashraj" ? "admin" : "user",
              })
            }
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateUser}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
        message={success}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
