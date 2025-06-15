import { Card, CardContent, Box, Typography, Chip, Button } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import CakeIcon from '@mui/icons-material/Cake';
import ScaleIcon from '@mui/icons-material/Scale';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SetMealIcon from '@mui/icons-material/SetMeal';

type Props = {
    pet: Pet
}

export default function PetCard({ pet }: Props) {
    return (
        <Card
            sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(210, 105, 30, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(139, 69, 19, 0.2)',
                    border: '2px solid rgba(210, 105, 30, 0.3)'
                }
            }}
        >
            <CardContent sx={{ p: 4 }}>
                {/* Main Content - Horizontal Layout */}
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', mb: 4, flexWrap: 'wrap' }}>
                    {/* Pet Image and Basic Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 280 }}>
                        <Box
                            component="img"
                            src="/pets/cat1.png"
                            alt={pet.name}
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                mr: 3,
                                border: '3px solid rgba(210, 105, 30, 0.2)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        />
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: '#8B4513',
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {pet.name}
                                <FavoriteIcon sx={{ ml: 1.5, fontSize: 24, color: '#ff6b6b' }} />
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#8B4513',
                                    opacity: 0.8,
                                    fontWeight: 500
                                }}
                            >
                                {pet.breed}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Pet Stats - Horizontal Layout */}
                    <Box sx={{ flex: 1, minWidth: 400 }}>
                        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                            {/* Age */}
                            <Box sx={{
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(210, 105, 30, 0.05)',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <CakeIcon sx={{ fontSize: 28, color: '#D2691E', mb: 1, mx: 'auto' }} />
                                <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mb: 1 }}>
                                    Age
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B4513' }}>
                                    {pet.age}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#8B4513', opacity: 0.6 }}>
                                    years
                                </Typography>
                            </Box>

                            {/* Weight */}
                            <Box sx={{
                                textAlign: 'center',
                                p: 3,
                                borderRadius: 3,
                                background: 'rgba(210, 105, 30, 0.05)',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <ScaleIcon sx={{ fontSize: 28, color: '#D2691E', mb: 1, mx: 'auto' }} />
                                <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mb: 1 }}>
                                    Weight
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B4513' }}>
                                    {pet.weight}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#8B4513', opacity: 0.6 }}>
                                    kg
                                </Typography>
                            </Box>
                        </Box>

                        {/* Activity & Health */}
                        <Box sx={{
                            p: 3,
                            borderRadius: 3,
                            background: 'rgba(210, 105, 30, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}>
                            {/* Activity Level */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DirectionsRunIcon sx={{ fontSize: 22, color: '#D2691E', mr: 2 }} />
                                <Typography variant="body1" sx={{ color: '#8B4513', opacity: 0.7, mr: 'auto' }}>
                                    Activity Level
                                </Typography>
                                <Chip
                                    label={pet.activityLevel}
                                    size="medium"
                                    sx={{
                                        background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                                        color: 'white',
                                        fontWeight: 600,
                                        textTransform: 'capitalize'
                                    }}
                                />
                            </Box>

                            {/* Health Status */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HealthAndSafetyIcon sx={{ fontSize: 22, color: '#D2691E', mr: 2 }} />
                                <Typography variant="body1" sx={{ color: '#8B4513', opacity: 0.7, mr: 'auto' }}>
                                    Health
                                </Typography>
                                {pet.healthIssues !== "None" ? (
                                    <Chip
                                        label={pet.healthIssues}
                                        size="medium"
                                        sx={{
                                            background: 'rgba(255, 87, 87, 0.1)',
                                            color: '#ff5757',
                                            border: '1px solid rgba(255, 87, 87, 0.3)',
                                            fontWeight: 500
                                        }}
                                    />
                                ) : (
                                    <Chip
                                        label="Healthy"
                                        size="medium"
                                        sx={{
                                            background: 'rgba(76, 175, 80, 0.1)',
                                            color: '#4caf50',
                                            border: '1px solid rgba(76, 175, 80, 0.3)',
                                            fontWeight: 500
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Action Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        startIcon={<SetMealIcon />}
                        sx={{
                            background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: '0 4px 16px rgba(210, 105, 30, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #CD853F 30%, #D2691E 90%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 6px 20px rgba(210, 105, 30, 0.4)'
                            }
                        }}
                    >
                        Create Recipe for {pet.name}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}