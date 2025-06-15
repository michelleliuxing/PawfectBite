import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography, Alert, Fade, Paper, Chip } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoadingSpinner from "../shared/components/ui/LoadingSpinner";

export default function HomePage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get<Pet[]>('https://localhost:5001/api/pets');
                setPets(response.data);
            } catch (err) {
                setError('Failed to load pets. Please try again later.');
                console.error('Error fetching pets:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) {
        return (
            <LoadingSpinner message="Fetching your furry friends..." fullScreen />
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 50%, #fef7e0 100%)',
                    pt: { xs: '100px', md: '120px' },
                    px: 2
                }}
            >
                <Container maxWidth="md">
                    <Alert
                        severity="error"
                        sx={{
                            borderRadius: 3,
                            background: 'rgba(255, 235, 238, 0.8)',
                            border: '1px solid rgba(211, 47, 47, 0.2)',
                            color: '#8B4513'
                        }}
                    >
                        {error}
                    </Alert>
                </Container>
            </Box>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #f9dba8 0%, #fbf5eb 30%, rgb(249, 233, 201) 70%, #fef7e0 100%)',
                    position: 'relative',
                    py: { xs: 8, md: 12 },
                    overflow: 'hidden',
                    pt: { xs: '100px', md: '120px' }
                }}
            >
                {/* Cute decorative elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: '5%',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'rgba(210, 105, 30, 0.1)',
                        animation: 'float 3s ease-in-out infinite',
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-15px)' }
                        }
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '8%',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'rgba(205, 133, 63, 0.15)',
                        animation: 'float 4s ease-in-out infinite reverse'
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '60%',
                        right: '15%',
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background: 'rgba(255, 165, 0, 0.1)',
                        animation: 'float 2.5s ease-in-out infinite'
                    }}
                />

                <Container maxWidth="lg">
                    <Fade in timeout={1000}>
                        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                            {/* Logo */}
                            <Box sx={{ mb: 4 }}>
                                <Box
                                    component="img"
                                    src="/logo_clear_background.PNG"
                                    alt="PawfectBite Logo"
                                    sx={{
                                        height: { xs: 80, md: 120 },
                                        width: 'auto',
                                        filter: 'drop-shadow(0 4px 8px rgba(139, 69, 19, 0.2))',
                                        animation: 'gentle-bounce 2s ease-in-out infinite',
                                        '@keyframes gentle-bounce': {
                                            '0%, 100%': { transform: 'translateY(0px)' },
                                            '50%': { transform: 'translateY(-5px)' }
                                        }
                                    }}
                                />
                            </Box>

                            {/* Brand Name */}
                            <Typography
                                variant="h1"
                                component="h1"
                                sx={{
                                    fontWeight: 1000,
                                    mb: 2,
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 2px 4px rgba(139, 69, 19, 0.1)',
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                PawfectBite
                            </Typography>

                            {/* Subtitle */}
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 6,
                                    color: '#8B4513',
                                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                                    fontWeight: 400,
                                    maxWidth: 700,
                                    mx: 'auto',
                                    lineHeight: 1.6
                                }}
                            >
                                Crafting tail-wagging recipes with love, one pawsome bite at a time 🐾
                            </Typography>

                            {/* Pet Counter */}
                            {pets.length > 0 && (
                                <Fade in timeout={1500}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            px: 4,
                                            py: 2,
                                            borderRadius: 50,
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(20px)',
                                            border: '2px solid rgba(210, 105, 30, 0.2)',
                                            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 12px 40px rgba(139, 69, 19, 0.15)'
                                            }
                                        }}
                                    >
                                        <FavoriteIcon sx={{ mr: 2, fontSize: 24, color: '#D2691E' }} />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#8B4513'
                                            }}
                                        >
                                            {pets.length} Happy {pets.length === 1 ? 'Pet' : 'Pets'}
                                        </Typography>
                                    </Paper>
                                </Fade>
                            )}

                            {/* Feature chips */}
                            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                                {['Personalised', 'Nutritious', 'Healthy'].map((feature, index) => (
                                    <Fade in timeout={1800 + index * 200} key={feature}>
                                        <Chip
                                            label={feature}
                                            sx={{
                                                background: 'rgba(255, 255, 255, 0.6)',
                                                color: '#8B4513',
                                                fontWeight: 500,
                                                px: 2,
                                                py: 1,
                                                fontSize: '0.9rem',
                                                border: '1px solid rgba(210, 105, 30, 0.3)',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 0.8)',
                                                    transform: 'translateY(-1px)'
                                                }
                                            }}
                                        />
                                    </Fade>
                                ))}
                            </Box>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* Welcome Content */}
            <Box sx={{
                background: 'linear-gradient(180deg, #fefcf3 0%, #f8f1e6 100%)',
                py: 8
            }}>
                <Container maxWidth="lg">
                    <Fade in timeout={1200}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    color: '#8B4513',
                                    mb: 3,
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Welcome to PawfectBite! 🎉
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#8B4513',
                                    opacity: 0.8,
                                    maxWidth: 800,
                                    mx: 'auto',
                                    lineHeight: 1.8
                                }}
                            >
                                Create personalized, nutritious recipes for your beloved pets.
                                Our smart recipe generator considers your pet's age, weight, activity level,
                                and health needs to craft the perfect meal every time.
                            </Typography>
                        </Box>
                    </Fade>
                </Container>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    py: 6,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="lg">
                    {/* Logo in footer */}
                    <Box sx={{ mb: 3 }}>
                        <Box
                            component="img"
                            src="/logo_clear_background.PNG"
                            alt="PawfectBite Logo"
                            sx={{
                                height: 50,
                                width: 'auto',
                                filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                                opacity: 0.9
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            mb: 2,
                            fontWeight: 800
                        }}
                    >
                        PawfectBite
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                        Made with <FavoriteIcon sx={{ fontSize: 18, color: '#ff6b6b', mx: 0.5 }} /> for your furry family
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        © 2025 PawfectBite. Spreading love, one recipe at a time.
                    </Typography>
                </Container>
            </Box>
        </>
    );
} 