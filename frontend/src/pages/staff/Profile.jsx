// src/pages/staff/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import staffLogo from "../../assets/logo.png"; // profile placeholder

export default function Profile({ userId }) {
  // State for profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State for salary & shifts
  const [salaries, setSalaries] = useState([]);
  const [shifts, setShifts] = useState([]);

  // Fetch mock user data (replace with API call)
  useEffect(() => {
    // Replace this with API: GET /staff/:userId/profile
    const mockProfile = {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+880 1234 567 890",
    };
    setProfile(mockProfile);

    // Only this staff's salary
    const mockSalaries = [
      { id: 1, amount: "$200", paymentDate: "2025-08-31", received: true },
      { id: 2, amount: "$180", paymentDate: "2025-09-30", received: false },
    ];
    setSalaries(mockSalaries);

    // Only this staff's assigned shifts
    const mockShifts = [
      { id: 1, date: "2025-09-15", start: "10:00 AM", end: "4:00 PM", role: "Cashier" },
      { id: 2, date: "2025-09-16", start: "12:00 PM", end: "6:00 PM", role: "Order Manager" },
    ];
    setShifts(mockShifts);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    // TODO: API call to save profile
    console.log("Profile saved:", profile);
    alert("Profile saved successfully!");
  };

  return (
    <Box sx={{ mt: 2, mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Profile
      </Typography>

      {/* Profile Card */}
      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
            <Avatar
              src={staffLogo}
              alt={profile.name}
              sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
            />
            <Typography variant="h6">{profile.name}</Typography>
          </Grid>

          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="warning" onClick={handleSave}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Salary Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        My Salary
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.id}>
                <TableCell>{salary.amount}</TableCell>
                <TableCell>{salary.paymentDate}</TableCell>
                <TableCell>
                  <Chip
                    label={salary.received ? "Received" : "Pending"}
                    color={salary.received ? "success" : "warning"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Shifts Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        My Assigned Shifts
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => (
              <TableRow key={shift.id}>
                <TableCell>{shift.date}</TableCell>
                <TableCell>{shift.start}</TableCell>
                <TableCell>{shift.end}</TableCell>
                <TableCell>{shift.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
