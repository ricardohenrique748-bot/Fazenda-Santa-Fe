import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2C5530', // Deep Forest Green
            light: '#4E7A52',
            dark: '#1B3A1E',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#8D6E63', // Earth Brown (Soft)
            light: '#BE9C91',
            dark: '#5F4339',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F9F9F7', // Warm Off-white / Cream
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A1C19', // Almost Black
            secondary: '#5C5F5C', // Dark Grey (Softer)
        },
        divider: 'rgba(93, 64, 55, 0.1)', // Subtle Brown tint
    },
    typography: {
        fontFamily: '"Outfit", "Inter", "Roboto", "Arial", sans-serif',
        h1: { fontWeight: 700, letterSpacing: '-0.02em', color: '#1B3A1E' },
        h2: { fontWeight: 700, letterSpacing: '-0.02em', color: '#1B3A1E' },
        h3: { fontWeight: 700, letterSpacing: '-0.02em', color: '#1B3A1E' },
        h4: {
            fontWeight: 700,
            color: '#1B3A1E',
            letterSpacing: '-0.02em',
        },
        h5: {
            fontWeight: 600,
            color: '#2C5530',
        },
        h6: {
            fontWeight: 600,
            color: '#2C5530',
        },
        subtitle1: {
            color: '#5F4339',
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontFamily: '"Outfit", sans-serif',
        },
    },
    shape: {
        borderRadius: 8, // Sophisticated, slightly tighter radius
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    boxShadow: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(44, 85, 48, 0.2)', // Green soft shadow
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #2C5530 0%, #3E6B42 100%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.04)', // Very soft, modern shadow
                    border: '1px solid rgba(0, 0, 0, 0.03)',
                },
                elevation1: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(0, 0, 0, 0.02)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#2C5530',
                    boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.05)', // Divider-like separation
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#F9F9F7',
                    color: '#5F4339',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
