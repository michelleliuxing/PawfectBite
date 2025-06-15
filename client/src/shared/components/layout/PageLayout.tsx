import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface PageLayoutProps {
    children: ReactNode;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    showFloatingElements?: boolean;
}

export default function PageLayout({
    children,
    maxWidth = 'lg',
    showFloatingElements = true
}: PageLayoutProps) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 30%, rgb(249, 233, 201) 70%, #fef7e0 100%)',
                pt: { xs: '100px', md: '120px' },
                pb: 6
            }}
        >
            {/* Cute floating food elements */}
            {showFloatingElements && (
                <>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '20%',
                            right: '5%',
                            fontSize: '2rem',
                            opacity: 0.3,
                            animation: 'float 4s ease-in-out infinite',
                            zIndex: 0,
                            '@keyframes float': {
                                '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                                '50%': { transform: 'translateY(-20px) rotate(5deg)' }
                            }
                        }}
                    >
                        🦴
                    </Box>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '60%',
                            left: '3%',
                            fontSize: '1.8rem',
                            opacity: 0.3,
                            animation: 'float 3s ease-in-out infinite reverse',
                            zIndex: 0
                        }}
                    >
                        🥩
                    </Box>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: '40%',
                            right: '15%',
                            fontSize: '1.5rem',
                            opacity: 0.3,
                            animation: 'float 5s ease-in-out infinite',
                            zIndex: 0
                        }}
                    >
                        🐟
                    </Box>
                </>
            )}

            <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 1 }}>
                {children}
            </Container>
        </Box>
    );
} 