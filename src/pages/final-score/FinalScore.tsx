import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router";


export default function FinalScore() {  
  const navigate = useNavigate();
  const [score, setScore] = useState(0)
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

  useEffect(() => {
    const storedScoreData = JSON.parse(localStorage.getItem("scoreData")) || 0;
    setScore(storedScoreData);
    console.log("Score:", storedScoreData);
  }, []);

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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        py: 6,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        elevation={3}
        sx={{ maxWidth: 500, width: "100%", p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" fontWeight={500} mb={4}>
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
      </Paper>
    </Box>
  );
}
