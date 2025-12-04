import React, { useState } from "react";
import { 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button, 
  Typography, 
  Grid,
  Paper
} from '@mui/material';
import { Add, AttachMoney } from '@mui/icons-material';

const defaultState = {
  title: "",
  amount: "",
  category: "Other",
  date: new Date().toISOString().slice(0, 10),
  note: "",
};

export default function ExpenseForm({ addExpense }) {
  const [form, setForm] = useState(defaultState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return alert("Add title and amount");
    addExpense(form);
    setForm(defaultState);
  };

  const categoryOptions = [
    { value: "Food", label: "🍕 Food", icon: "🍕" },
    { value: "Transport", label: "🚗 Transport", icon: "🚗" },
    { value: "Bills", label: "💡 Bills", icon: "💡" },
    { value: "Entertainment", label: "🎬 Entertainment", icon: "🎬" },
    { value: "Other", label: "📦 Other", icon: "📦" },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="primary.main" mb={3}>
        💰 Add New Expense
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              name="title"
              label="Expense Title"
              placeholder="Enter expense title"
              value={form.title}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              name="amount"
              label="Amount (₹)"
              type="number"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                startAdornment: <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              name="date"
              type="date"
              label="Date"
              value={form.date}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={form.category}
                onChange={handleChange}
                label="Category"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {categoryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="note"
              label="Note (Optional)"
              placeholder="Add a note about this expense"
              value={form.note}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={2}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Add />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
                fontSize: '1rem',
                fontWeight: 700,
                '&:hover': {
                  background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
                },
              }}
            >
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
