import { Card, CardContent, Box, Typography, Chip, Button } from '@mui/material';
import { Pet } from '../../../shared/types';
import CakeIcon from '@mui/icons-material/Cake';
import ScaleIcon from '@mui/icons-material/Scale';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface PetCardProps {
    pet: Pet;
    onCreateRecipe?: (pet: Pet) => void;
}

export default function PetCard({ pet, onCreateRecipe }: PetCardProps) {
    const handleCreateRecipe = () => {
        if (onCreateRecipe) {
            onCreateRecipe(pet);
        } else {
            console.log(`Creating recipe for ${pet.name}`);
        }
    };

    const getHealthStatusColor = (healthIssues: string) => {
        if (healthIssues === 'None' || healthIssues === '') {
            return {
                background: 'rgba(76, 175, 80, 0.1)',
                color: '#4caf50',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                label: 'Healthy'
            };
        }
        return {
            background: 'rgba(255, 87, 87, 0.1)',
            color: '#ff5757',
            border: '1px solid rgba(255, 87, 87, 0.3)',
            label: healthIssues
        };
    };

    const healthStatus = getHealthStatusColor(pet.healthIssues);

    return (
        <Card
            sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(210, 105, 30, 0.1)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(139, 69, 19, 0.2)',
                    border: '2px solid rgba(210, 105, 30, 0.3)'
                }
            }}
        >
            <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Pet Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                        component="img"
                        src={pet.imageUrl || "/pets/default-pet.png"}
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
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                color: '#8B4513',
                                mb: 0.5
                            }}
                        >
                            {pet.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8B4513', opacity: 0.8 }}>
                            {pet.breed}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.6 }}>
                            {pet.type}
                        </Typography>
                    </Box>
                </Box>

                {/* Pet Details */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(210, 105, 30, 0.05)',
                        flex: '1 1 120px',
                        minWidth: 100
                    }}>
                        <CakeIcon sx={{ fontSize: 24, color: '#D2691E', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mb: 0.5 }}>
                            Age
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B4513' }}>
                            {pet.age}
                        </Typography>
                    </Box>

                    <Box sx={{
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: 'rgba(210, 105, 30, 0.05)',
                        flex: '1 1 120px',
                        minWidth: 100
                    }}>
                        <ScaleIcon sx={{ fontSize: 24, color: '#D2691E', mb: 1 }} />
                        <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mb: 0.5 }}>
                            Weight
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B4513' }}>
                            {pet.weight}kg
                        </Typography>
                    </Box>
                </Box>

                {/* Activity & Health */}
                <Box sx={{
                    p: 2.5,
                    borderRadius: 2,
                    background: 'rgba(210, 105, 30, 0.05)',
                    mb: 3,
                    flex: 1
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <DirectionsRunIcon sx={{ fontSize: 20, color: '#D2691E', mr: 1.5 }} />
                        <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mr: 'auto' }}>
                            Activity Level
                        </Typography>
                        <Chip
                            label={pet.activityLevel}
                            size="small"
                            sx={{
                                background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                                color: 'white',
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                fontSize: '0.75rem'
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HealthAndSafetyIcon sx={{ fontSize: 20, color: '#D2691E', mr: 1.5 }} />
                        <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.7, mr: 'auto' }}>
                            Health Status
                        </Typography>
                        <Chip
                            label={healthStatus.label}
                            size="small"
                            sx={{
                                background: healthStatus.background,
                                color: healthStatus.color,
                                border: healthStatus.border,
                                fontWeight: 500,
                                fontSize: '0.75rem'
                            }}
                        />
                    </Box>
                </Box>

                {/* Recipe Button */}
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RestaurantIcon />}
                    onClick={handleCreateRecipe}
                    sx={{
                        background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                        borderRadius: 2,
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
            </CardContent>
        </Card>
    );
} 