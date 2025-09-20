import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import type { ICategory } from "../../types";

export default function Dashboard() {
  const navigate = useNavigate();

  const [categories, setCategories] = React.useState<ICategory[]>([]);

  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedAmount, setSelectedAmount] = React.useState(0);

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
    navigate(`/question?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`);
  }

  return (
    <>
      <Typography variant="h2" gutterBottom align="center">
        Quiz App
      </Typography>

      <form onSubmit={onSubmit}>
        <Box>
          <FormControl required fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cate => (
                <MenuItem key={cate.id} value={cate.id}>{cate.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required fullWidth sx={{ mt: 3 }}>
            <InputLabel id="difficulty">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              value={selectedDifficulty}
              label="Difficulty"
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <FormControl required fullWidth sx={{ mt: 3 }}>
            <InputLabel id="difficulty">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={selectedType}
              label="Type"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="multiple">Multiple Choice</MenuItem>
              <MenuItem value="boolean">True/False</MenuItem>
            </Select>
          </FormControl>

          <TextField required id="outlined-basic" label="Amount of Questions" variant="outlined" fullWidth sx={{ mt: 3 }} 
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))} />
        </Box>

        <Box sx={{ textAlign: 'center',  mt: 3 }}>
          <Button variant="contained" type="submit">GET STARTED</Button>
        </Box>

      </form>

    </>
  )
}
