import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PetCard from '../features/pets/components/PetCard';
import { Pet } from '../shared/types/pet.types';
import { PageLayout, LoadingSpinner, ErrorAlert, EmptyState } from '../shared';

// Mock data for development
const mockPets: Pet[] = [
    {
        id: '1',
        name: 'Buddy',
        type: 'Dog',
        breed: 'Golden Retriever',
        age: 3,
        weight: 25,
        activityLevel: 'High',
        healthIssues: 'None',
        imageUrl: '/pets/dog1.jpg',
        isDesexed: true,
        healthStatus: 'healthy'
    },
    {
        id: '2',
        name: 'Whiskers',
        type: 'Cat',
        breed: 'Persian',
        age: 2,
        weight: 4,
        activityLevel: 'Low',
        healthIssues: 'Allergies',
        imageUrl: '/pets/cat1.jpg',
        isDesexed: true,
        healthStatus: 'needs-attention'
    },
    {
        id: '3',
        name: 'Max',
        type: 'Dog',
        breed: 'German Shepherd',
        age: 5,
        weight: 30,
        activityLevel: 'High',
        healthIssues: 'None',
        imageUrl: '/pets/dog2.jpg',
        isDesexed: true,
        healthStatus: 'healthy'
    }
];

export default function MyPetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            setLoading(true);
            setError(null);

            // Try to fetch from .NET API first (via Vite proxy)
            try {
                console.log('Attempting to fetch pets from .NET API via proxy...');
                const response = await fetch('/api/pets');

                if (!response.ok) {
                    throw new Error(`API responded with status: ${response.status}`);
                }

                const data = await response.json();

                const petsWithStatus = data.map((pet: Pet) => ({
                    ...pet,
                    healthStatus: (pet.healthIssues === 'None' || pet.healthIssues === '') ? 'healthy' as const : 'needs-attention' as const
                }));
                setPets(petsWithStatus);
            } catch (apiError) {
                // If API fails, use mock data for development
                console.log('API not available, using mock data for development. Error:', apiError);
                const petsWithStatus = mockPets.map(pet => ({
                    ...pet,
                    healthStatus: (pet.healthIssues === 'None' || pet.healthIssues === '') ? 'healthy' as const : 'needs-attention' as const
                }));
                setPets(petsWithStatus);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAddPet = () => {
        // TODO: Implement add pet functionality
        console.log('Add pet clicked');
    };

    if (loading) {
        return <LoadingSpinner message="Fetching your furry friends..." fullScreen />;
    }

    if (error) {
        return (
            <ErrorAlert
                message={error}
                onRetry={fetchPets}
                fullScreen
            />
        );
    }

    return (
        <PageLayout>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box
                    sx={{
                        fontSize: '4rem',
                        mb: 2,
                        animation: 'gentle-bounce 3s ease-in-out infinite',
                        '@keyframes gentle-bounce': {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' }
                        }
                    }}
                >
                    🐾
                </Box>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#8b6914',
                        fontWeight: 700,
                        mb: 2
                    }}
                >
                    My Pets Dashboard
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#a67c00',
                        maxWidth: '600px',
                        mx: 'auto',
                        lineHeight: 1.6
                    }}
                >
                    Manage your furry friends and discover personalized recipes for their perfect nutrition
                </Typography>
            </Box>

            {/* Stats Cards */}
            <Box sx={{ display: 'flex', gap: 3, mb: 6, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                    <Box
                        sx={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h4" sx={{ color: '#d4a574', fontWeight: 700, mb: 1 }}>
                            {pets.length}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8b6914', fontWeight: 500 }}>
                            Total Pets
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                    <Box
                        sx={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h4" sx={{ color: '#d4a574', fontWeight: 700, mb: 1 }}>
                            {pets.filter(pet => pet.healthStatus === 'healthy').length}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8b6914', fontWeight: 500 }}>
                            Healthy Pets
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
                    <Box
                        sx={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            p: 3,
                            textAlign: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h4" sx={{ color: '#d4a574', fontWeight: 700, mb: 1 }}>
                            12
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#8b6914', fontWeight: 500 }}>
                            Recipes Generated
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Pets Grid */}
            {pets.length === 0 ? (
                <EmptyState
                    icon="🐕"
                    title="No pets yet!"
                    description="Add your first furry friend to get started with personalized pet nutrition recommendations."
                    actionLabel="Add Your First Pet"
                    onAction={handleAddPet}
                    fullScreen
                />
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)'
                        },
                        gap: 3
                    }}
                >
                    {pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </Box>
            )}

            {/* Floating Action Button */}
            <Fab
                color="primary"
                aria-label="add pet"
                onClick={handleAddPet}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    background: 'linear-gradient(45deg, #d4a574 30%, #e6c68a 90%)',
                    color: 'white',
                    width: 64,
                    height: 64,
                    boxShadow: '0 8px 25px rgba(212, 165, 116, 0.4)',
                    '&:hover': {
                        background: 'linear-gradient(45deg, #c19660 30%, #d4a574 90%)',
                        transform: 'scale(1.1)',
                        boxShadow: '0 12px 35px rgba(212, 165, 116, 0.5)'
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                <AddIcon sx={{ fontSize: '2rem' }} />
            </Fab>
        </PageLayout>
    );
} 