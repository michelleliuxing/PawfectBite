import { Alert, Box, Container, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ErrorAlertProps {
    message: string;
    onRetry?: () => void;
    fullScreen?: boolean;
}

export default function ErrorAlert({ message, onRetry, fullScreen = false }: ErrorAlertProps) {
    const content = (
        <Alert
            severity="error"
            sx={{
                borderRadius: 3,
                background: 'rgba(255, 235, 238, 0.8)',
                border: '1px solid rgba(211, 47, 47, 0.2)',
                color: 'text.primary'
            }}
            action={
                onRetry && (
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={<RefreshIcon />}
                        onClick={onRetry}
                        sx={{ textTransform: 'none' }}
                    >
                        Retry
                    </Button>
                )
            }
        >
            {message}
        </Alert>
    );

    if (fullScreen) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 50%, #fef7e0 100%)',
                    pt: { xs: '100px', md: '120px' },
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md">
                    {content}
                </Container>
            </Box>
        );
    }

    return content;
} 