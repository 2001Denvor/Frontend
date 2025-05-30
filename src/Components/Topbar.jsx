import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Adjust path if needed

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  Box,
  Select,
  FormControl,
  useTheme,
  Tooltip,
  Switch
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Topbar = ({ toggleTheme, isDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState('EN');

  const { user, login, logout } = useAuth();

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f1f1f1', px: 2, borderRadius: 2 }}>
          <SearchIcon />
          <InputBase placeholder="Search..." sx={{ ml: 1, flex: 1 }} />
        </Box>

        {/* Right Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Tooltip title="Upload">
            <IconButton>
              <CloudUploadIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Switch Role">
            <FormControl>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">User</Typography>
                  <Switch
                    checked={user?.role === 'admin'}
                    onChange={(e) => {
                      const newRole = e.target.checked ? 'admin' : 'user';
                      login(newRole === 'admin' ? 'admin@example.com' : 'user@example.com', 'password'); // use dummy password
                    }}
                    inputProps={{ 'aria-label': 'role switch' }}
                  />
                <Typography variant="body2">Admin</Typography>
              </Box>
            </FormControl>
          </Tooltip>


          {/* Language Selector */}
          <FormControl size="small" variant="standard">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disableUnderline
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="EN">EN</MenuItem>
              <MenuItem value="FR">FR</MenuItem>
              <MenuItem value="SI">SI</MenuItem>
            </Select>
          </FormControl>

          {/* Profile Menu */}
          <IconButton onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

