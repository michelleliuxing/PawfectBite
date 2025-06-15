import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Alert
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pet } from '../../../shared/types/pet.types';

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    pet: Pet | null;
    loading?: boolean;
}

export default function DeleteConfirmDialog({
    open,
    onClose,
    onConfirm,
    pet,
    loading = false
}: DeleteConfirmDialogProps) {

    // Handle confirmation
    const handleConfirm = async () => {
        try {
            await onConfirm();
            onClose(); // Close dialog on successful deletion
        } catch (error) {
            // Error handling is done in the parent component
            console.error('Delete failed:', error);
        }
    };

    // Get pet emoji based on type
    const getPetEmoji = (type: string) => {
        switch (type?.toLowerCase()) {
            case 'dog': return '🐕';
            case 'cat': return '🐱';
            default: return '🐾';
        }
    };

    if (!pet) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 87, 87, 0.2)',
                    boxShadow: '0 24px 48px rgba(255, 87, 87, 0.15)'
                }
            }}
        >
            {/* Dialog Header */}
            <DialogTitle sx={{
                pb: 2,
                textAlign: 'center',
                background: 'linear-gradient(45deg, rgba(255, 87, 87, 0.05) 30%, rgba(255, 152, 152, 0.05) 90%)'
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <WarningAmberIcon sx={{ color: '#ff5757', fontSize: '3rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                        Delete Pet? 😢
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 2, pb: 3 }}>
                {/* Warning Alert */}
                <Alert
                    severity="warning"
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        background: 'rgba(255, 193, 7, 0.1)',
                        border: '1px solid rgba(255, 193, 7, 0.3)'
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        This action cannot be undone. All data for this pet will be permanently removed.
                    </Typography>
                </Alert>

                {/* Pet Information */}
                <Box sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid rgba(255, 87, 87, 0.1)',
                    textAlign: 'center'
                }}>
                    <Box
                        component="img"
                        src={pet.imageUrl || "/pets/default-pet.png"}
                        alt={pet.name}
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mb: 2,
                            border: '3px solid rgba(255, 87, 87, 0.2)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />

                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: '#8B4513',
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        {getPetEmoji(pet.type)} {pet.name}
                    </Typography>

                    <Typography variant="body1" sx={{ color: '#8B4513', opacity: 0.8, mb: 0.5 }}>
                        {pet.breed}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#8B4513', opacity: 0.6 }}>
                        {pet.age} years old • {pet.weight}kg
                    </Typography>
                </Box>

                {/* Confirmation Message */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body1" sx={{
                        color: '#d32f2f',
                        fontWeight: 500,
                        mb: 1
                    }}>
                        Are you sure you want to delete <strong>{pet.name}</strong>?
                    </Typography>
                    <Typography variant="body2" sx={{
                        color: '#666',
                        fontStyle: 'italic'
                    }}>
                        We'll miss the little furry friend... 💔
                    </Typography>
                </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ p: 3, pt: 1, justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        borderColor: '#8B4513',
                        color: '#8B4513',
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#8B4513',
                            background: 'rgba(139, 69, 19, 0.04)'
                        }
                    }}
                >
                    Cancel 😌
                </Button>

                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? null : <DeleteIcon />}
                    sx={{
                        background: 'linear-gradient(45deg, #ff5757 30%, #ff8a80 90%)',
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #f44336 30%, #ff5757 90%)',
                        },
                        '&:disabled': {
                            background: 'rgba(255, 87, 87, 0.3)'
                        }
                    }}
                >
                    {loading ? 'Deleting...' : 'Yes, Delete 💔'}
                </Button>
            </DialogActions>
        </Dialog>
    );
} 