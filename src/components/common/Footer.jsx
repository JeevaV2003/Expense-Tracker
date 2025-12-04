import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Link, Grid, Divider } from '@mui/material';
import { GitHub, LinkedIn, Instagram, Favorite, Code, Email } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: '#C1E59F', // Light Green
        color: '#064E3B', // Dark Green Text
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Code sx={{ fontSize: 32, color: '#065F46' }} />
              <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 1 }}>
                EXPENSE<span style={{ color: '#065F46' }}>TRACKER</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9, maxWidth: 300, lineHeight: 1.6, fontWeight: 500 }}>
              Master your finances with our premium tracking tools. Simple, secure, and smart.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight={700} mb={2} sx={{ color: '#065F46' }}>
              Connect
            </Typography>
            <Stack spacing={2}>
              <Link href="mailto:jeeva0327.2002@gmail.com" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', '&:hover': { color: '#065F46' }, fontWeight: 500 }}>
                <Email fontSize="small" /> jeeva0327.2002@gmail.com
              </Link>
              <Link href="https://github.com/JeevaV2003" target="_blank" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', '&:hover': { color: '#065F46' }, fontWeight: 500 }}>
                <GitHub fontSize="small" /> GitHub Profile
              </Link>
              <Link href="https://linkedin.com/in/jeeva-v-2003-" target="_blank" color="inherit" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', '&:hover': { color: '#065F46' }, fontWeight: 500 }}>
                <LinkedIn fontSize="small" /> LinkedIn Profile
              </Link>
            </Stack>
          </Grid>

          {/* Developer Badge */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Box
              sx={{
                textAlign: 'center',
                mt: 2
              }}
            >
              <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                Crafted By
              </Typography>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 0, color: '#065F46' }}>
                Jeeva V
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Bar */}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" gap={2}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} ExpenseTracker. All rights reserved.
          </Typography>
        </Box>
      </Container>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
}
