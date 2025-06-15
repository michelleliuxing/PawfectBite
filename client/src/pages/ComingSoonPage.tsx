import { Box, Container, Typography, Fade } from "@mui/material";

interface ComingSoonPageProps {
    title: string;
    emoji: string;
    description: string;
}

export default function ComingSoonPage({ title, emoji, description }: ComingSoonPageProps) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 50%, #fef7e0 100%)',
                pt: { xs: '100px', md: '120px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Fade in timeout={1000}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Box
                            sx={{
                                fontSize: '6rem',
                                mb: 4,
                                animation: 'gentle-bounce 2s ease-in-out infinite',
                                '@keyframes gentle-bounce': {
                                    '0%, 100%': { transform: 'translateY(0px)' },
                                    '50%': { transform: 'translateY(-15px)' }
                                }
                            }}
                        >
                            {emoji}
                        </Box>

                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 1000,
                                mb: 3,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                                background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h5"
                            sx={{
                                color: '#8B4513',
                                fontWeight: 400,
                                mb: 6,
                                opacity: 0.8
                            }}
                        >
                            {description}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#8B4513',
                                mb: 2
                            }}
                        >
                            Coming Soon! 🎉
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: '#8B4513',
                                opacity: 0.7
                            }}
                        >
                            We're working hard to bring you something pawsome! 🐾
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
} 