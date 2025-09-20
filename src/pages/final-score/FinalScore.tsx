import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";


export default function FinalScore() {  
  const navigate = useNavigate();
  const score = useSelector((state: RootState) => state.finalScore.score);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email Address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Thêm mới thành công");
      console.log("Form Data:", { ...formData, score });

      const existingData = JSON.parse(localStorage.getItem("userData")) || [];

      const updatedData = [...existingData, { ...formData, score }];

      localStorage.setItem("userData", JSON.stringify(updatedData));
      navigate(`/leaderboard`);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  };

  return (
    <>
      <Typography variant="h2" gutterBottom align="center">
        Final Score: {score}
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
          variant="outlined"
        />

        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </>
   
  );
}
