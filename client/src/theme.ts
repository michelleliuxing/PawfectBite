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
            main: '#D2691E', // Orange
            light: '#f9dba8',
            dark: '#8B4513',
        },
        secondary: {
            main: '#CD853F', // Peru
            light: '#fbf5eb',
            dark: '#A0522D',
        },
        background: {
            default: '#fefcf3',
            paper: '#ffffff',
        },
        text: {
            primary: '#8B4513',
            secondary: '#A0522D',
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