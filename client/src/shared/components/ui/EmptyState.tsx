import { Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    fullScreen?: boolean;
}

export default function EmptyState({
    icon = '🐕',
    title,
    description,
    actionLabel,
    onAction,
    fullScreen = false
}: EmptyStateProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                py: fullScreen ? 8 : 4,
                px: 2,
                ...(fullScreen && {
                    minHeight: '60vh',
                    justifyContent: 'center'
                })
            }}
        >
            <Box
                sx={{
                    fontSize: '4rem',
                    mb: 2,
                    opacity: 0.7,
                    animation: 'gentle-bounce 3s ease-in-out infinite',
                    '@keyframes gentle-bounce': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-10px)' }
                    }
                }}
            >
                {icon}
            </Box>

            <Typography
                variant="h5"
                sx={{
                    color: '#8b6914',
                    fontWeight: 600,
                    mb: 1
                }}
            >
                {title}
            </Typography>

            {description && (
                <Typography
                    variant="body1"
                    sx={{
                        color: '#a67c00',
                        mb: 3,
                        maxWidth: '400px',
                        lineHeight: 1.6
                    }}
                >
                    {description}
                </Typography>
            )}

            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{
                        background: 'linear-gradient(45deg, #d4a574 30%, #e6c68a 90%)',
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: '25px',
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(212, 165, 116, 0.3)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #c19660 30%, #d4a574 90%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(212, 165, 116, 0.4)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
} 