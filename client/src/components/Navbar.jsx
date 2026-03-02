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
import "../styles/navbar.css";
import { clearAuthCache } from "../utilities/auth";
import { API_BASE } from "../config/api.js";

export default function Navbar({ setMessage }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/logout`);

      if (res.data.success) {
        clearAuthCache();
        localStorage.removeItem("token");
        setMessage?.("Logged out successfully");
        navigate("/auth/login", { replace: true });
      }
    } catch (err) {
      setMessage?.("Couldn't log out");
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
          background: '#3b82f6',
          color: 'white',
          fontWeight: 600,
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
          '&:hover': {
            background: '#2563eb',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.2s ease'
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
            background: '#ffffff',
            borderRight: '1px solid #e2e8f0',
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
            background: '#3b82f6',
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
                <span style={{fontSize: '1.5rem', fontWeight: 800, color: 'white', lineHeight: 1}}>₹</span>
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
                    transition: 'all 0.2s ease',
                    background: '#f8fafc',
                    marginBottom: '0.5rem',
                    border: '1px solid #e2e8f0',
                    '&:hover': {
                      background: '#3b82f6',
                      color: 'white',
                      borderColor: '#3b82f6',
                      transform: 'translateX(4px)',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
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
                  transition: 'all 0.2s ease',
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  '&:hover': {
                    background: '#ef4444',
                    color: 'white',
                    borderColor: '#ef4444',
                    transform: 'translateX(4px)',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.2)',
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
            borderTop: '1px solid #e2e8f0',
            background: '#f8fafc',
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