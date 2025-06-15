import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    size?: number;
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    message = 'Loading...',
    size = 40,
    fullScreen = false
}: LoadingSpinnerProps) {
    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                ...(fullScreen && {
                    minHeight: '100vh',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 30%, rgb(249, 233, 201) 70%, #fef7e0 100%)'
                })
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 3
                }}
            >
                <CircularProgress
                    size={size}
                    sx={{
                        color: '#d4a574',
                        mb: 1,
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round'
                        }
                    }}
                />
                <Box
                    component="img"
                    src="/logo_clear_background.PNG"
                    alt="PawfectBite Logo"
                    sx={{
                        height: 80,
                        width: 'auto',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' },
                            '100%': { transform: 'scale(1)' }
                        }
                    }}
                />
            </Box>

            <Typography
                variant="body2"
                sx={{
                    color: '#8b6914',
                    textAlign: 'center',
                    fontWeight: 500
                }}
            >
                {message}
            </Typography>
        </Box>
    );

    return content;
} 