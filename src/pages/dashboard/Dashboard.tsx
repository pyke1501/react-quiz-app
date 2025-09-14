import React from "react";
import { useNavigate } from "react-router";

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { ICategory } from "../../types";

export default function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<ICategory[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        setCategories(data.trivia_categories);
      } catch (e) {
        console.log('fetch categories fails: ', e)
      }
    }
    fetchCategories();
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate('/question')
  }

  return (
    <>
      <Typography variant="h2" gutterBottom align="center">
        Quiz App
      </Typography>

      <form onSubmit={onSubmit}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              // value={age}
              label="Category"
              // onChange={handleChange}
            >
              {categories.map(cate => (
                <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="difficulty">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              // value={age}
              label="Difficulty"
              // onChange={handleChange}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="difficulty">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              // value={age}
              label="Type"
              // onChange={handleChange}
            >
              <MenuItem value="multiple">Multiple Choice</MenuItem>
              <MenuItem value="boolean">True/False</MenuItem>
            </Select>
          </FormControl>

          <TextField id="outlined-basic" label="Amount of Questions" variant="outlined" fullWidth sx={{ mt: 3 }} />
        </Box>

        <Box sx={{ textAlign: 'center',  mt: 3 }}>
          <Button variant="contained" type="submit">GET STARTED</Button>
        </Box>

      </form>

    </>
  )
}
