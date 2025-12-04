import React, { useMemo, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CardHeader,
  Divider,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Chip
} from '@mui/material';
import { AccountBalance, TrendingUp, PieChart, ListAlt, AttachMoney, GetApp, Publish } from '@mui/icons-material';
import useLocalStorage from "../hooks/useLocalStorage";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";
import ExpenseChartNew from "../components/expense/ExpenseChart";
import { getMonthKey } from "../utils/format";
import { sendExpenseNotification } from "../utils/email";

export default function Dashboard() {
  const [expenses, setExpenses] = useLocalStorage("expenses_v1", []);
  const [budget, setBudget] = useLocalStorage("budget_v1", 0);
  const [monthFilter, setMonthFilter] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");

  const addExpense = async (expense) => {
    const e = {
      ...expense,
      amount: Number(expense.amount),
      date: new Date(expense.date).toISOString(),
      id: Date.now().toString(),
    };
    setExpenses((prev) => [e, ...prev]);

    // Calculate current month total after adding the new expense
    const currentMonthKey = getMonthKey(new Date(e.date));
    const currentMonthTotal = [...expenses, e]
      .filter((exp) => getMonthKey(new Date(exp.date)) === currentMonthKey)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

    // Send email notification
    const emailResult = await sendExpenseNotification(e, currentMonthTotal);
    alert(emailResult.message);
  };

  const removeExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  const filteredExpenses = useMemo(() => {
    // Filter by selected month
    let filtered = expenses.filter((e) => getMonthKey(new Date(e.date)) === monthFilter);

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((e) => e.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "amount-asc":
          return Number(a.amount) - Number(b.amount);
        case "amount-desc":
          return Number(b.amount) - Number(a.amount);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  }, [expenses, monthFilter, categoryFilter, sortOption]);

  const monthlyTotal = filteredExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const budgetUsage = budget > 0 ? (monthlyTotal / budget) * 100 : 0;
  const isOverBudget = budget > 0 && monthlyTotal > budget;

  // Calculate previous month comparison
  const previousMonthTotal = useMemo(() => {
    const currentDate = new Date(monthFilter + '-01');
    const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
    return expenses
      .filter((e) => getMonthKey(new Date(e.date)) === prevMonthKey)
      .reduce((s, e) => s + Number(e.amount), 0);
  }, [expenses, monthFilter]);

  const monthComparison = useMemo(() => {
    if (previousMonthTotal === 0) return null;
    const difference = monthlyTotal - previousMonthTotal;
    const percentage = (difference / previousMonthTotal) * 100;
    return {
      difference,
      percentage: Math.abs(percentage),
      isIncrease: difference > 0,
      isDecrease: difference < 0
    };
  }, [monthlyTotal, previousMonthTotal]);

  const monthOptions = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(getMonthKey(d));
    }
    expenses.forEach((e) => {
      const mk = getMonthKey(new Date(e.date));
      if (!months.includes(mk)) months.push(mk);
    });
    return months.sort((a, b) => b.localeCompare(a));
  }, [expenses]);

  // Export functions
  const exportToCSV = () => {
    const headers = ['Title', 'Amount', 'Category', 'Date', 'Note'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(e => [
        `"${e.title}"`,
        e.amount,
        `"${e.category || 'Other'}"`,
        `"${new Date(e.date).toLocaleDateString()}"`,
        `"${e.note || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(expenses, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import function
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let importedExpenses = [];
        if (file.name.endsWith('.json')) {
          importedExpenses = JSON.parse(e.target.result);
        } else if (file.name.endsWith('.csv')) {
          const csvText = e.target.result;
          const lines = csvText.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
          importedExpenses = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.replace(/"/g, '').trim());
            return {
              title: values[0] || '',
              amount: parseFloat(values[1]) || 0,
              category: values[2] || 'Other',
              date: values[3] ? new Date(values[3]).toISOString() : new Date().toISOString(),
              note: values[4] || '',
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };
          });
        }

        // Merge with existing expenses, avoiding duplicates by title and date
        const existingKeys = new Set(expenses.map(e => `${e.title}-${e.date}`));
        const newExpenses = importedExpenses.filter(e => !existingKeys.has(`${e.title}-${e.date}`));

        if (newExpenses.length > 0) {
          setExpenses(prev => [...prev, ...newExpenses]);
          alert(`Successfully imported ${newExpenses.length} new expenses.`);
        } else {
          alert('No new expenses to import (all were duplicates).');
        }
      } catch (error) {
        alert('Error importing file. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    // Reset file input
    event.target.value = '';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: -1 }}>
          EXPENSE<span style={{ color: '#10B981' }}>TRACKER</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
          Track your expenses efficiently and stay on top of your finances
        </Typography>
      </Box>

      {/* Budget and Filters Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
            <AttachMoney color="primary" sx={{ fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700} color="primary.main">
              Monthly Budget:
            </Typography>
            <TextField
              type="number"
              size="small"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="Set budget"
              sx={{ width: { xs: '100%', sm: 150 } }}
            />
          </Box>
          {budget > 0 && (
            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  Budget Usage
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color={isOverBudget ? 'error.main' : 'success.main'}
                >
                  {budgetUsage.toFixed(1)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(budgetUsage, 100)}
                color={isOverBudget ? 'error' : budgetUsage > 80 ? 'warning' : 'success'}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: '#334155',
                }}
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="caption" color="text.secondary">
                  Spent: ₹{monthlyTotal.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Remaining: ₹{Math.max(0, budget - monthlyTotal).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          )}
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} gap={2}>
            <Box display="flex" flexWrap="wrap" alignItems="center" gap={2}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>View Month</InputLabel>
                <Select
                  value={monthFilter}
                  label="View Month"
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  {monthOptions.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Bills">Bills</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOption}
                  label="Sort By"
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <MenuItem value="date-desc">Newest First</MenuItem>
                  <MenuItem value="date-asc">Oldest First</MenuItem>
                  <MenuItem value="amount-desc">Highest Amount</MenuItem>
                  <MenuItem value="amount-asc">Lowest Amount</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              textAlign={{ xs: 'left', md: 'right' }}
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.1)',
                p: 2,
                borderRadius: 4,
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                color={isOverBudget ? 'error.main' : 'primary.main'}
                mb={1}
              >
                ₹{monthlyTotal.toFixed(2)}
              </Typography>
              {monthComparison && (
                <Chip
                  size="small"
                  label={`${monthComparison.isIncrease ? '↑' : monthComparison.isDecrease ? '↓' : '→'} ${monthComparison.percentage.toFixed(1)}%`}
                  color={monthComparison.isIncrease ? 'error' : monthComparison.isDecrease ? 'success' : 'default'}
                  sx={{
                    fontWeight: 700,
                  }}
                />
              )}
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                vs last month
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Expense List Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader
          avatar={<ListAlt color="primary" />}
          title="Expenses"
          titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
        />
        <CardContent>
          <ExpenseForm addExpense={addExpense} />
          <Divider sx={{ my: 3 }} />
          {filteredExpenses.length > 0 ? (
            <ExpenseList expenses={filteredExpenses} onDelete={removeExpense} />
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No expenses for this month yet. Add one above.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader
          avatar={<PieChart color="secondary" />}
          title="Analytics & Insights"
          titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
        />
        <CardContent>
          <ExpenseChartNew expenses={filteredExpenses} allExpenses={expenses} />
        </CardContent>
      </Card>

      {/* Data Management Section */}
      <Box textAlign="center" mt={8} py={4}>
        <Card
          sx={{
            maxWidth: 700,
            mx: 'auto',
            p: 4,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            📊 Data Management
          </Typography>
          <Box 
            display="flex" 
            flexDirection={{ xs: 'column', sm: 'row' }} 
            justifyContent="center" 
            gap={2} 
            mb={3}
          >
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<GetApp />} 
              onClick={exportToCSV} 
              sx={{ 
                minWidth: 160,
                py: 1.2,
                background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
                }
              }}
            >
              Export CSV
            </Button>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<Publish />} 
              onClick={exportToJSON} 
              sx={{ 
                minWidth: 160,
                py: 1.2,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                }
              }}
            >
              Export JSON
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              component="label" 
              startIcon={<Publish />} 
              sx={{ 
                minWidth: 160,
                py: 1.2,
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
                }
              }}
            >
              Import Data
              <input
                type="file"
                accept=".csv,.json"
                onChange={importData}
                style={{ display: 'none' }}
              />
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            💾 Data is saved locally in your browser (localStorage)
          </Typography>
        </Card>
      </Box>
    </Container>
  );
}
