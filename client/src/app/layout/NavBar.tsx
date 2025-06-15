import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
// Icons for navigation
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import InfoIcon from '@mui/icons-material/Info';
// Icons for settings
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const pages = [
  { name: 'Home', icon: HomeIcon, path: '/' },
  { name: 'My Pets', icon: PetsIcon, path: '/my-pets' },
  { name: 'Recipes', icon: RestaurantMenuIcon, path: '/recipes' },
  { name: 'About', icon: InfoIcon, path: '/about' }
];

const settings = [
  { name: 'Profile', icon: PersonIcon },
  { name: 'Account', icon: AccountCircleIcon },
  { name: 'Settings', icon: SettingsIcon },
  { name: 'Logout', icon: LogoutIcon }
];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isActivePage = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, rgba(249, 219, 168, 0.95) 0%, rgba(251, 245, 235, 0.95) 50%, rgba(249, 233, 201, 0.95) 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(249, 219, 168, 1) 0%, rgba(251, 245, 235, 1) 50%, rgba(249, 233, 201, 1) 100%)',
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1
          }}
        >
          {/* Left: Logo and Brand */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/logo_clear_background.PNG"
              alt="PawfectBite Logo"
              sx={{
                height: 45,
                width: 'auto',
                mr: 2,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 1000,
                color: '#8B4513',
                textDecoration: 'none',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                background: 'linear-gradient(45deg, #D2691E, #CD853F)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              PawfectBite
            </Typography>
          </Box>

          {/* Center: Navigation */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            {pages.map((page) => {
              const IconComponent = page.icon;
              const isActive = isActivePage(page.path);
              return (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  startIcon={<IconComponent sx={{ fontSize: '18px' }} />}
                  sx={{
                    my: 1,
                    px: 3,
                    py: 1,
                    width: 150,
                    color: isActive ? '#FFFFFF' : '#8B4513',
                    fontWeight: isActive ? 700 : 500,
                    textTransform: 'none',
                    borderRadius: 25,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    display: { xs: 'none', md: 'flex' },
                    background: isActive ? 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(210, 105, 30, 0.3)' : 'none',
                    '&:hover': {
                      background: isActive
                        ? 'linear-gradient(45deg, #CD853F 30%, #D2691E 90%)'
                        : 'rgba(139, 69, 19, 0.08)',
                      transform: 'translateY(-1px)',
                      boxShadow: isActive
                        ? '0 6px 16px rgba(210, 105, 30, 0.4)'
                        : '0 4px 12px rgba(139, 69, 19, 0.15)'
                    },
                    '& .MuiButton-startIcon': {
                      marginRight: '6px'
                    }
                  }}
                >
                  {page.name}
                </Button>
              );
            })}

            {/* Mobile navigation with just icons */}
            {pages.map((page) => {
              const IconComponent = page.icon;
              const isActive = isActivePage(page.path);
              return (
                <Tooltip title={page.name} key={`mobile-${page.name}`}>
                  <IconButton
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      color: isActive ? '#FFFFFF' : '#8B4513',
                      display: { xs: 'flex', md: 'none' },
                      mx: 0.5,
                      transition: 'all 0.3s ease',
                      background: isActive ? 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)' : 'transparent',
                      borderRadius: 2,
                      '&:hover': {
                        background: isActive
                          ? 'linear-gradient(45deg, #CD853F 30%, #D2691E 90%)'
                          : 'rgba(139, 69, 19, 0.08)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    <IconComponent sx={{ fontSize: '20px' }} />
                  </IconButton>
                </Tooltip>
              );
            })}
          </Box>

          {/* Right: User Menu */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 25,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(139, 69, 19, 0.1)',
                p: 0.5
              }}
            >
              <Tooltip title="My Profile">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0.5,
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <Avatar
                    alt="User Avatar"
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 36,
                      height: 36,
                      border: '2px solid rgba(139, 69, 19, 0.2)'
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Paper>

            <Menu
              sx={{
                mt: '50px',
                '& .MuiPaper-root': {
                  borderRadius: 3,
                  background: 'rgba(255, 248, 225, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 69, 19, 0.1)',
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)',
                  minWidth: 180
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                const IconComponent = setting.icon;
                return (
                  <MenuItem
                    key={setting.name}
                    onClick={handleCloseUserMenu}
                    sx={{
                      px: 3,
                      py: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      '&:hover': {
                        background: 'rgba(139, 69, 19, 0.08)'
                      }
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: '20px',
                        color: '#8B4513',
                        opacity: 0.8
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#8B4513',
                        fontWeight: 500
                      }}
                    >
                      {setting.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;