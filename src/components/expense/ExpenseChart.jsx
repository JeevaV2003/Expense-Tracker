import React, { useMemo } from "react"; // v2
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { TrendingUp, EmojiEvents, Category, ShowChart, AccountBalanceWallet, CalendarToday, TrendingDown } from '@mui/icons-material';

/* Modern color palette */
const COLORS = [
  "#3B82F6", // Blue
  "#F97316", // Orange
  "#10B981", // Green
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EAB308", // Yellow
  "#EC4899", // Pink
  "#06B6D4", // Cyan
];

// Robust wrapper to prevent Recharts from rendering in 0-sized containers
const ChartContainer = ({ children, height }) => {
  const containerRef = React.useRef(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    };

    // Initial measure
    updateDimensions();

    // Observer for changes
    const resizeObserver = new ResizeObserver(() => {
      // Wrap in requestAnimationFrame to avoid "ResizeObserver loop limit exceeded"
      window.requestAnimationFrame(updateDimensions);
    });
    
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: "100%", 
        height: height, 
        minWidth: 0, 
        minHeight: height, 
        position: 'relative' 
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 ? children : null}
    </Box>
  );
};

export default function ExpenseChartNew({ expenses, allExpenses }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to get month key for currentMonthTotal
  const getMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

  const pieData = useMemo(() => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      const cat = expense.category || "Other";
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += Number(expense.amount);
    });

    return Object.keys(categoryTotals)
      .map((category) => ({
        name: category,
        value: categoryTotals[category],
      }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const dailyTrendData = useMemo(() => {
    const dailyTotals = {};
    // Sort expenses by date first
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedExpenses.forEach((expense) => {
      const date = new Date(expense.date);
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      if (!dailyTotals[dayKey]) {
        dailyTotals[dayKey] = 0;
      }
      dailyTotals[dayKey] += Number(expense.amount);
    });

    return Object.keys(dailyTotals)
      .sort()
      .map((dateKey) => ({
        day: dateKey.split('-')[2], // Extract day part
        total: Math.round(dailyTotals[dateKey] * 100) / 100,
      }));
  }, [expenses]);

  const lineData = useMemo(() => {
    const monthlyTotals = {};
    allExpenses.forEach((expense) => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!monthlyTotals[monthKey]) {
        monthlyTotals[monthKey] = 0;
      }
      monthlyTotals[monthKey] += Number(expense.amount);
    });

    return Object.keys(monthlyTotals)
      .sort()
      .map((monthKey) => ({
        month: monthKey, // Keep full key for sorting, can format for display later
        total: Math.round(monthlyTotals[monthKey] * 100) / 100,
      }));
  }, [allExpenses]);

  const topExpenses = useMemo(() => {
    return [...expenses]
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 3);
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  const averageDailySpend = useMemo(() => {
    if (expenses.length === 0) return 0;
    const uniqueDates = new Set(expenses.map(e => new Date(e.date).toDateString())).size;
    return uniqueDates > 0 ? totalExpenses / uniqueDates : 0;
  }, [expenses, totalExpenses]);

  const currentMonthTotal = useMemo(() => {
    const currentMonthKey = getMonthKey(new Date());
    return expenses
      .filter(e => getMonthKey(new Date(e.date)) === currentMonthKey)
      .reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  const getCategoryColor = (index) => {
    const colors = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    return colors[index % colors.length];
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return '🍔';
      case 'Transport': return '🚗';
      case 'Entertainment': return '🎬';
      case 'Bills': return '💡';
      case 'Health': return '🏥';
      case 'Education': return '📚';
      case 'Shopping': return '🛍️';
      default: return '📦';
    }
  };

  if (!mounted) {
    return <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading charts...</Box>;
  }

  return (
    <Box>
      {/* Summary Header Card */}
      <Card
        sx={{
          mb: 8,
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 8px 32px rgba(5, 150, 105, 0.1)',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountBalanceWallet />
            </Avatar>
          }
          title={
            <Typography variant="h5" fontWeight={700} color="primary.main">
              💰 Expense Dashboard
            </Typography>
          }
          sx={{ pb: 2 }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={800} color="primary.main">
                  ₹{totalExpenses.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Expenses
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={800} color="success.main">
                  ₹{averageDailySpend.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Avg Daily Spend
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight={800} color="warning.main">
                  ₹{currentMonthTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This Month
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Top 3 Largest Expenses */}
        {topExpenses.length > 0 && (
          <Card
            className="h-[400px] flex flex-col"
            sx={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(16, 185, 129, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(5, 150, 105, 0.15)',
              },
            }}
          >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <EmojiEvents />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" fontWeight={700}>
                    🏆 Top 3 Largest Expenses
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent>
                <List>
                  {topExpenses.map((expense, index) => (
                    <React.Fragment key={expense.id}>
                      <ListItem
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          bgcolor: index === 0
                            ? 'rgba(239, 68, 68, 0.1)'
                            : index === 1
                            ? 'rgba(245, 158, 11, 0.1)'
                            : 'rgba(16, 185, 129, 0.1)',
                          border: `1px solid ${index === 0 ? 'rgba(239, 68, 68, 0.2)' : index === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateX(4px)',
                            boxShadow: 2,
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: index === 0 ? 'error.main' : index === 1 ? 'warning.main' : 'info.main',
                              fontWeight: 700,
                            }}
                          >
                            #{index + 1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={600}>
                              {expense.title}
                            </Typography>
                          }
                          secondaryTypographyProps={{ component: 'div' }}
                          secondary={
                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                              <Chip
                                label={expense.category}
                                size="small"
                                icon={<span>{getCategoryIcon(expense.category)}</span>}
                                sx={{ height: 20, fontSize: '0.7rem' }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {new Date(expense.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                        <Typography variant="h6" fontWeight={800} color="primary.main">
                          ₹{Number(expense.amount).toFixed(2)}
                        </Typography>
                      </ListItem>
                      {index < topExpenses.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
        )}

        {/* Category Breakdown Pie Chart */}
        {pieData.length > 0 && (
          <Card
            className="h-[400px] flex flex-col"
            sx={{
              height: '100%',
              backgroundColor: '#FFFFFF',
                border: '1px solid rgba(158, 198, 243, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(159, 179, 223, 0.2)',
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <Category />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" fontWeight={700}>
                    📊 Category Breakdown
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent>
                <ChartContainer height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getCategoryColor(index)} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                        contentStyle={{
                          borderRadius: 12,
                          border: '1px solid #A7F3D0',
                          backgroundColor: '#FFFFFF',
                          color: '#064E3B'
                        }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: 20 }}
                        formatter={(value) => `${getCategoryIcon(value)} ${value}`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>
        )}

        {/* Daily Spending Trend */}
        {dailyTrendData.length > 0 && (
          <Card
            className="h-[400px] flex flex-col"
            sx={{
              height: '100%',
              backgroundColor: '#FFFFFF',
                border: '1px solid rgba(158, 198, 243, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(159, 179, 223, 0.2)',
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <TrendingUp />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" fontWeight={700}>
                    📈 Daily Spending Trend
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent>
                <ChartContainer height={250}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: '#064E3B', fontSize: 12 }}
                        stroke="#A7F3D0"
                      />
                      <YAxis
                        tick={{ fill: '#064E3B', fontSize: 12 }}
                        stroke="#A7F3D0"
                      />
                      <Tooltip
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                        contentStyle={{
                          borderRadius: 12,
                          border: '1px solid #A7F3D0',
                          backgroundColor: '#FFFFFF',
                          color: '#064E3B'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>
        )}

        {/* Monthly Totals */}
        {lineData.length > 0 && (
          <Card
            className="h-[400px] flex flex-col"
            sx={{
              height: '100%',
              backgroundColor: '#FFFFFF',
                border: '1px solid rgba(158, 198, 243, 0.2)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 24px rgba(159, 179, 223, 0.2)',
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <ShowChart />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" fontWeight={700}>
                    📅 Monthly Totals
                  </Typography>
                }
                sx={{ pb: 1 }}
              />
              <CardContent>
                <ChartContainer height={250}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.05)" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#064E3B', fontSize: 12 }}
                        stroke="#A7F3D0"
                      />
                      <YAxis
                        tick={{ fill: '#064E3B', fontSize: 12 }}
                        stroke="#A7F3D0"
                      />
                      <Tooltip
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Total']}
                        contentStyle={{
                          borderRadius: 12,
                          border: '1px solid #A7F3D0',
                          backgroundColor: '#FFFFFF',
                          color: '#064E3B'
                        }}
                      />
                      <Bar
                        dataKey="total"
                        fill="url(#colorGradient)"
                        radius={[8, 8, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                          <stop offset="100%" stopColor="#059669" stopOpacity={1} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
          </Card>
        )}
      </div>

      {pieData.length === 0 && dailyTrendData.length === 0 && lineData.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(13, 148, 136, 0.05) 100%)',
              border: '2px dashed rgba(16, 185, 129, 0.2)',
              mt: 3,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No data to display
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add some expenses to see beautiful charts and insights!
            </Typography>
          </Paper>
      )}
    </Box>
  );
}


