import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  Container,
  IconButton,
  Stack
} from '@mui/material';
import { 
  Email, 
  Phone, 
  GitHub, 
  LinkedIn, 
  Send 
} from '@mui/icons-material';

export default function About() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 4, md: 8 }, 
          borderRadius: 6,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)',
          border: '1px solid rgba(16, 185, 129, 0.1)',
          boxShadow: '0 20px 40px -12px rgba(5, 150, 105, 0.1)',
        }}
      >
        <Grid container spacing={8}>
          {/* Left Column - Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight={800} 
                gutterBottom
                sx={{ 
                  background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Get in Touch
              </Typography>
              
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400 }}>
                I'd like to hear from you! If you have any inquiries or just want to say hi, please use the contact form.
              </Typography>

              <Stack spacing={3} mt={2}>
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton 
                    sx={{ 
                      bgcolor: 'rgba(16, 185, 129, 0.1)', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.2)' }
                    }}
                  >
                    <Email />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
                    <Typography 
                      component="a" 
                      href="mailto:jeeva0327.2002@gmail.com" 
                      variant="body1" 
                      color="text.primary" 
                      fontWeight={600}
                      sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                    >
                      jeeva0327.2002@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton 
                    sx={{ 
                      bgcolor: 'rgba(16, 185, 129, 0.1)', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.2)' }
                    }}
                  >
                    <Phone />
                  </IconButton>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Phone</Typography>
                    <Typography 
                      component="a" 
                      href="tel:+916361154988" 
                      variant="body1" 
                      color="text.primary" 
                      fontWeight={600}
                      sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                    >
                      +91-6361154988
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" gap={2} mt={2}>
                  <Button
                    component="a"
                    href="https://github.com/JeevaV2003"
                    target="_blank"
                    variant="outlined"
                    startIcon={<GitHub />}
                    sx={{ 
                      borderRadius: 3,
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(16, 185, 129, 0.05)'
                      }
                    }}
                  >
                    GitHub
                  </Button>
                  <Button
                    component="a"
                    href="https://linkedin.com/in/jeeva-v-2003-"
                    target="_blank"
                    variant="outlined"
                    startIcon={<LinkedIn />}
                    sx={{ 
                      borderRadius: 3,
                      borderColor: 'rgba(16, 185, 129, 0.3)',
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(16, 185, 129, 0.05)'
                      }
                    }}
                  >
                    LinkedIn
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: 3
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: 3
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: 3
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#FFFFFF',
                        borderRadius: 3
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
                        boxShadow: '0 6px 20px rgba(5, 150, 105, 0.4)',
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
