import * as React from "react";
import axios from "axios";
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setMessage }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/logout");

      if (res.data.success) {
        setMessage("Logged out successfully");
        navigate("/login");
      }
    } catch (err) {
      setMessage("Couldn't log out");
    }
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Filter", path: "/filter" }
  ];

  return (
    <>
      <Button 
        onClick={toggleDrawer(true)}
        className="navbar-toggle-btn"
        sx={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          fontWeight: 600,
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          style={{ marginRight: '8px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Menu
      </Button>

      <Drawer 
        anchor="left" 
        open={open} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
            borderRight: 'none',
          }
        }}
      >
        <Box 
          sx={{ 
            width: 280,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }} 
          role="presentation"
        >
          {/* Drawer Header */}
          <Box sx={{ 
            padding: '2rem 1.5rem',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
            color: 'white',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '0.5rem'
            }}>
              <Box sx={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Box>
              <Box>
                <Box sx={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 700,
                  letterSpacing: '-0.01em'
                }}>
                  Expense Tracker
                </Box>
                <Box sx={{ 
                  fontSize: '0.875rem', 
                  opacity: 0.9,
                  fontWeight: 300
                }}>
                  Financial Management
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Menu Items */}
          <List sx={{ 
            flex: 1, 
            padding: '1rem 0.75rem',
            '& .MuiListItem-root': {
              marginBottom: '0.5rem'
            }
          }}>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: '12px',
                    padding: '0.875rem 1.25rem',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    marginBottom: '0.5rem',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      transform: 'translateX(4px)',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                      '& .MuiListItemText-primary': {
                        color: 'white',
                        fontWeight: 600
                      }
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#374151',
                        transition: 'all 0.3s ease'
                      }
                    }}
                  />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </ListItemButton>
              </ListItem>
            ))}

            {/* Logout Button */}
            <ListItem disablePadding sx={{ marginTop: '1rem' }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  borderRadius: '12px',
                  padding: '0.875rem 1.25rem',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  border: '2px solid #ef4444',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    background: '#ef4444',
                    color: 'white',
                    transform: 'translateX(4px)',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                    '& .MuiListItemText-primary': {
                      color: 'white',
                      fontWeight: 600
                    }
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ marginRight: '12px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <ListItemText 
                  primary="Logout"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ef4444',
                      transition: 'all 0.3s ease'
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          {/* Footer */}
          <Box sx={{
            padding: '1.5rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            background: 'white',
            textAlign: 'center'
          }}>
            <Box sx={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              fontWeight: 500
            }}>
              © 2024 Expense Tracker
            </Box>
            <Box sx={{ 
              fontSize: '0.75rem', 
              color: '#9ca3af',
              marginTop: '0.25rem'
            }}>
              Manage your finances smartly
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}