import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Fab,
    Snackbar,
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PetCard from '../features/pets/components/PetCard';
import PetFormDialog from '../features/pets/components/PetFormDialog';
import DeleteConfirmDialog from '../features/pets/components/DeleteConfirmDialog';
import { Pet, PetFormData } from '../shared/types/pet.types';
import { PageLayout, LoadingSpinner, ErrorAlert, EmptyState } from '../shared';
import { apiService } from '../shared/services/api.service';

// Mock data for development fallback
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
    // State management
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dialog states
    const [formDialogOpen, setFormDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);
    const [deletingPet, setDeletingPet] = useState<Pet | null>(null);

    // Loading states for operations
    const [formLoading, setFormLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Snackbar for success messages
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: '',
        severity: 'success'
    });

    /**
     * Fetch all pets from API or fallback to mock data
     */
    const fetchPets = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            console.log('Attempting to fetch pets from .NET API...');
            const fetchedPets = await apiService.getPets();

            // Add computed health status for UI (since api.service doesn't do this)
            const petsWithHealthStatus = fetchedPets.map(pet => ({
                ...pet,
                healthStatus: (pet.healthIssues === 'None' || pet.healthIssues === '')
                    ? 'healthy' as const
                    : 'needs-attention' as const
            }));

            setPets(petsWithHealthStatus);
            console.log('Successfully fetched pets from API:', fetchedPets.length);

        } catch (apiError) {
            console.error('Failed to fetch pets from API:', apiError);

            // In development, we can fall back to mock data
            // In production, we should show an error
            if (process.env.NODE_ENV === 'development') {
                console.log('Development mode: Using mock data as fallback');
                setPets(mockPets);
                setSnackbar({
                    open: true,
                    message: 'Using demo data - API not connected',
                    severity: 'info'
                });
            } else {
                // In production, set error state instead of using mock data
                const errorMessage = apiError instanceof Error ? apiError.message : 'Failed to load pets';
                setError(`Unable to load your pets: ${errorMessage}`);
            }
        } finally {
            setLoading(false);
        }
    }, []); // Empty dependency array - this function should only be created once

    // Fetch pets on component mount
    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    /**
     * Handle adding a new pet
     */
    const handleAddPet = useCallback(() => {
        setEditingPet(null); // Clear any editing state
        setFormDialogOpen(true);
    }, []);

    /**
     * Handle editing an existing pet
     */
    const handleEditPet = useCallback((pet: Pet) => {
        setEditingPet(pet);
        setFormDialogOpen(true);
    }, []);

    /**
     * Handle delete pet request
     */
    const handleDeletePet = useCallback((pet: Pet) => {
        setDeletingPet(pet);
        setDeleteDialogOpen(true);
    }, []);

    /**
     * Handle form submission (create or update)
     */
    const handleFormSubmit = useCallback(async (formData: PetFormData) => {
        try {
            setFormLoading(true);

            if (editingPet) {
                // Update existing pet
                const updatedPet = await apiService.updatePet(editingPet.id, formData);

                // Merge the updated data with existing pet data to ensure all fields are preserved
                const completeUpdatedPet = {
                    ...editingPet,
                    ...updatedPet,
                    ...formData,
                    id: editingPet.id // Ensure ID is preserved
                };

                // Update pets on UI (local state) - only on successful API call
                setPets(prevPets =>
                    prevPets.map(pet =>
                        pet.id === editingPet.id ? completeUpdatedPet : pet
                    )
                );

                setSnackbar({
                    open: true,
                    message: 'Pet updated successfully! 🎉',
                    severity: 'success'
                });
            } else {
                // Create new pet
                const createdPet = await apiService.createPet(formData);

                // Add to local state - only on successful API call
                const newPet: Pet = {
                    ...createdPet,
                    healthIssues: createdPet.healthIssues || formData.healthIssues || 'None',
                    imageUrl: createdPet.imageUrl || formData.imageUrl || '',
                    healthStatus: (createdPet.healthIssues === 'None' || createdPet.healthIssues === '' || !createdPet.healthIssues)
                        ? 'healthy' as const
                        : 'needs-attention' as const
                };

                setPets(prevPets => [...prevPets, newPet]);
                setSnackbar({
                    open: true,
                    message: `${formData.name} added successfully! 🐾`,
                    severity: 'success'
                });
            }

        } catch (error) {
            console.error('API operation failed:', error);

            // Show error message without updating local state
            const errorMessage = error instanceof Error ? error.message : 'Operation failed';
            setSnackbar({
                open: true,
                message: `Failed to ${editingPet ? 'update' : 'create'} pet: ${errorMessage}`,
                severity: 'error'
            });

            throw error; // Re-throw to let the form handle it
        } finally {
            setFormLoading(false);
        }
    }, [editingPet]);

    /**
     * Handle pet deletion confirmation
     */
    const handleDeleteConfirm = useCallback(async () => {
        if (!deletingPet) return;

        try {
            setDeleteLoading(true);

            // Delete from API first
            await apiService.deletePet(deletingPet.id);

            // Only remove from local state if API call succeeded
            setPets(prevPets => prevPets.filter(pet => pet.id !== deletingPet.id));

            setSnackbar({
                open: true,
                message: `${deletingPet.name} has been removed`,
                severity: 'success'
            });

        } catch (error) {
            console.error('Delete operation failed:', error);

            // Show error message without updating local state
            const errorMessage = error instanceof Error ? error.message : 'Delete failed';
            setSnackbar({
                open: true,
                message: `Failed to delete ${deletingPet.name}: ${errorMessage}`,
                severity: 'error'
            });

            throw error; // Re-throw to let the dialog handle it
        } finally {
            setDeleteLoading(false);
        }
    }, [deletingPet]);

    /**
     * Handle recipe creation (placeholder)
     */
    const handleCreateRecipe = useCallback((pet: Pet) => {
        setSnackbar({
            open: true,
            message: `Recipe feature coming soon for ${pet.name}! 🍽️`,
            severity: 'info'
        });
        console.log('Creating recipe for:', pet);
    }, []);

    /**
     * Close form dialog
     */
    const handleFormDialogClose = useCallback(() => {
        setFormDialogOpen(false);
        setEditingPet(null);
    }, []);

    /**
     * Close delete dialog
     */
    const handleDeleteDialogClose = useCallback(() => {
        setDeleteDialogOpen(false);
        setDeletingPet(null);
    }, []);

    /**
     * Close snackbar
     */
    const handleSnackbarClose = useCallback(() => {
        setSnackbar(prev => ({ ...prev, open: false }));
    }, []);

    // Loading state
    if (loading) {
        return <LoadingSpinner message="Fetching your furry friends..." fullScreen />;
    }

    // Error state
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
                {/* Total Pets Card */}
                <Box key="total-pets" sx={{ flex: '1 1 200px', minWidth: 200 }}>
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
                            Total Pets 🐕🐱
                        </Typography>
                    </Box>
                </Box>

                {/* Healthy Pets Card */}
                <Box key="healthy-pets" sx={{ flex: '1 1 200px', minWidth: 200 }}>
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
                            Healthy Pets 💚
                        </Typography>
                    </Box>
                </Box>

                {/* Recipes Generated Card (Placeholder) */}
                <Box key="recipes-generated" sx={{ flex: '1 1 200px', minWidth: 200 }}>
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
                            Recipes Generated 🍽️
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
                        <PetCard
                            key={`pet-${pet.id}-${pet.name}`}
                            pet={pet}
                            onCreateRecipe={handleCreateRecipe}
                            onEdit={handleEditPet}
                            onDelete={handleDeletePet}
                        />
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

            {/* Pet Form Dialog */}
            <PetFormDialog
                open={formDialogOpen}
                onClose={handleFormDialogClose}
                onSubmit={handleFormSubmit}
                pet={editingPet}
                loading={formLoading}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
                onConfirm={handleDeleteConfirm}
                pet={deletingPet}
                loading={deleteLoading}
            />

            {/* Success/Error Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{
                        borderRadius: 2,
                        fontWeight: 500
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </PageLayout>
    );
} 