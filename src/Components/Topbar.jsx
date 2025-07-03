import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ✅ Make sure path is correct

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Select,
  FormControl,
  Tooltip,
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

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/signin');
  };

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'pearlwhite', px: 2, borderRadius: 2 }}>
          <SearchIcon />
          <InputBase placeholder="Search..." sx={{ ml: 1, flex: 1 }} />
        </Box>

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

          <Tooltip title="Toggle Theme">
            <IconButton onClick={toggleTheme}>
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

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

          <IconButton onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
