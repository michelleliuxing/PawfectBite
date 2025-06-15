import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h2: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h3: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h4: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h5: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        h6: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        body1: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        body2: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        button: {
            fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
        },
    },
    palette: {
        primary: {
            main: '#D2691E',
            light: '#CD853F',
            dark: '#8B4513',
        },
        secondary: {
            main: '#ff6b6b',
            light: '#ff8a80',
            dark: '#d32f2f',
        },
        background: {
            default: '#fbf5eb',
            paper: '#ffffff',
        },
        text: {
            primary: '#8B4513',
            secondary: 'rgba(139, 69, 19, 0.7)',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: '"Varela Round", "Roboto", "Helvetica", "Arial", sans-serif',
                },
            },
        },
    },
});

export default theme; 