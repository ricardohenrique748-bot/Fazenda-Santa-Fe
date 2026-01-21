import { useState, forwardRef } from 'react';
import {
    Box,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem as MuiMenuItem,
    Button,
    Fade,
    Paper,
    Popper,
    Grow,
    MenuList,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    Logout,
    KeyboardArrowDown,
    KeyboardArrowRight
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { APP_MENU } from '../../config/menu';
import type { AppMenuItem } from '../../config/menu';
import { authService } from '../../services/api';
import logo from '../../assets/logo.png';

// --- Recursive Menu Item Component ---
const NestedMenuItem = forwardRef<HTMLDivElement, { item: AppMenuItem; onClick: () => void }>(
    ({ item, onClick, ...props }, ref) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const navigate = useNavigate();

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            if (item.children) {
                setAnchorEl(event.currentTarget);
            } else if (item.path) {
                navigate(item.path);
                onClick(); // Close the main menu
            }
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleItemClick = () => {
            onClick(); // Close parent
            handleClose();
        };

        return (
            <Box
                ref={ref}
                onMouseLeave={handleClose}
                sx={{ position: 'relative' }}
                {...props}
            >
                <MuiMenuItem
                    onClick={handleClick}
                    onMouseEnter={(e) => {
                        if (item.children) setAnchorEl(e.currentTarget);
                    }}
                    sx={{
                        justifyContent: 'space-between',
                        minWidth: 200,
                        px: 2,
                        py: 1.5,
                        color: '#2C5530'
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {item.icon && <item.icon fontSize="small" color="inherit" />}
                        <Typography variant="body2">{item.label}</Typography>
                    </Box>
                    {item.children && <KeyboardArrowRight fontSize="small" />}
                </MuiMenuItem>

                {item.children && (
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        placement="right-start"
                        transition
                        disablePortal
                        style={{ zIndex: 1301 }} // Higher than typical menu
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                                <Paper sx={{
                                    mt: -0.5,
                                    ml: 0.5,
                                    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: 2,
                                    overflow: 'hidden'
                                }}>
                                    <MenuList disablePadding>
                                        {item.children?.map((child, index) => (
                                            <NestedMenuItem
                                                key={index}
                                                item={child}
                                                onClick={handleItemClick}
                                            />
                                        ))}
                                    </MenuList>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                )}
            </Box>
        );
    }
);
NestedMenuItem.displayName = 'NestedMenuItem';

// --- Top Level Module Menu Component ---
const ModuleDropdown = ({ module }: { module: typeof APP_MENU[0] }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                id={`module-btn-${module.id}`}
                aria-controls={open ? `module-menu-${module.id}` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<module.icon />}
                endIcon={<KeyboardArrowDown sx={{
                    transition: 'transform 0.2s',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                }} />}
                sx={{
                    color: open ? '#2C5530' : '#5D4037',
                    fontWeight: open ? 700 : 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    backgroundColor: open ? 'rgba(44, 85, 48, 0.08)' : 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgba(44, 85, 48, 0.04)',
                        color: '#2C5530'
                    }
                }}
            >
                {module.label}
            </Button>
            <Menu
                id={`module-menu-${module.id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': `module-btn-${module.id}`,
                }}
                TransitionComponent={Fade}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        minWidth: 220,
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.06)',
                        '& .MuiMenuItem-root': {
                            fontSize: '0.95rem',
                            py: 1.5
                        },
                    },
                }}
            >
                {module.items.map((item, index) => (
                    <NestedMenuItem key={index} item={item} onClick={handleClose} />
                ))}
            </Menu>
        </>
    );
};

export default function MainLayout() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />

            {/* Top Bar */}
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
                    {/* Logo Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src={logo}
                            alt="Fazenda Santa Fé"
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                height: 50,
                                width: 'auto',
                                cursor: 'pointer',
                                mr: 4,
                                objectFit: 'contain'
                            }}
                        />
                    </Box>

                    {/* Navigation Section - Centered if possible, or just left aligned next to logo */}
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1,
                        gap: 1,
                        overflowX: 'auto',
                        pb: 0.5 // Scrollbar padding if needed
                    }}>
                        {APP_MENU.map((module) => (
                            <ModuleDropdown key={module.id} module={module} />
                        ))}
                    </Box>

                    {/* User Section */}
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, border: '1px solid #E0E0E0' }}>
                            <Avatar alt="Admin" src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
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
                            <MuiMenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Sair</ListItemText>
                            </MuiMenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content Area */}
            <Box component="main" sx={{
                flexGrow: 1,
                p: { xs: 2, md: 4 },
                backgroundColor: '#F9F9F7',
                backgroundImage: 'radial-gradient(#E8E8E4 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                width: '100%',
                overflowX: 'hidden'
            }}>
                <Outlet />
            </Box>
        </Box>
    );
}
