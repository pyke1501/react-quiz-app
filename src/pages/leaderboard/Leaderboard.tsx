import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CSVLink } from "react-csv";
import convertDateTimeToString from "../../utils/convertDateTimeToString";

// leaderboard-

export default function Leaderboard() {
  const data =  JSON.parse(localStorage.getItem("userData")) || [];

  console.log('data: ', data)

  return (
    <>
      <Typography variant="h2" gutterBottom align="center">
        Leaderboard
      </Typography>
      <Box sx={{ gap: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <CSVLink
          data={data}
          // filename={"my-file.csv"}
          filename={convertDateTimeToString('leaderboard') + '.csv'}
          target="_blank"
        >
          <Button
            variant="contained"
            color="primary"
          >
            Export CSV
          </Button>
        </CSVLink>
        
        <Button
          variant="outlined"
          color="primary"
          onClick={() => (window.location.href = "/")}
        >
          GO HOME
        </Button>
      </Box>

      <br />

      <TableContainer component={Paper}>
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
    </>
  );
}