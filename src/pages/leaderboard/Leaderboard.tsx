import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const exportCSV = (data) => {
  console.log("==========EXPORT==========");
     
};

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setData(storedData);
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        py: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Leaderboard
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => exportCSV(data)}
        >
          EXPORT CSV
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          GO HOME
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>First Name</b></TableCell>
              <TableCell><b>Last Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Score</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}