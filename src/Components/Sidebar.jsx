import React, { useState } from 'react';
import { Drawer, List, ListItemIcon, ListItemText, ListItemButton, IconButton, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  BarChart as BarChartIcon,
  Storage as StorageIcon,
  ShowChart as ShowChartIcon,
  CalendarToday as CalendarTodayIcon,
  Chat as ChatIcon,
  HelpOutline as HelpOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  FeedbackOutlined as FeedbackOutlinedIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '../Components/AuthContext';

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', roles: ['admin', 'user'] },
  { label: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics', roles: ['admin'] },
  { label: 'Statistics', icon: <BarChartIcon />, path: '/stats', roles: ['admin'] },
  { label: 'Documentation', icon: <DescriptionOutlinedIcon />, path: '/docs', roles: ['admin', 'user'] },
  { label: 'Data', icon: <StorageIcon />, path: '/data', roles: ['admin'] },
  { label: 'Chart', icon: <ShowChartIcon />, path: '/charts', roles: ['admin'] },
  { label: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar', roles: ['user'] },
  { label: 'Chat', icon: <ChatIcon />, path: '/chat', roles: ['user'] },
  { label: 'Help / Support', icon: <HelpOutlineIcon />, path: '/help', roles: ['admin', 'user'] },
  { label: 'Feedback', icon: <FeedbackOutlinedIcon />, path: '/feedback', roles: ['admin', 'user'] },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 72 : 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 72 : 240,
          top: '70px',
          height: 'calc(100vh - 70px)',
          transition: 'width 0.3s',
        },
      }}
    >
      <List>
        <Tooltip title="Toggle" placement="right">
          <IconButton onClick={toggleCollapse} sx={{ mx: 'auto', my: 1 }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>

        {menuItems
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => (
            <ListItemButton
              key={item.label}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e0f7fa',
                  color: 'primary.main',
                },
              }}
            >
              <Tooltip title={collapsed ? item.label : ''} placement="right">
                <ListItemIcon>{item.icon}</ListItemIcon>
              </Tooltip>
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
