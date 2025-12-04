import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { Delete, AttachMoney } from '@mui/icons-material';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export default function ExpenseList({ expenses, onDelete }) {
  if (!expenses.length) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h6" color="text.secondary" fontWeight={500}>
          No expenses for this month yet.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add one using the button below.
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Category</TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Date</TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Note</TableCell>
            <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((e) => (
            <TableRow key={e.id} sx={{ '&:hover': { backgroundColor: 'rgba(5, 150, 105, 0.05)' } }}>
              <TableCell sx={{ color: 'text.primary' }}>{e.title}</TableCell>
              <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
                ₹{Number(e.amount).toFixed(2)}
              </TableCell>
              <TableCell>
                <Chip
                  label={e.category}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{formatDate(e.date)}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{e.note || '-'}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onDelete && onDelete(e.id)}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.light',
                    },
                  }}
                  size="small"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
