import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    IconButton,
    Alert,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PetsIcon from '@mui/icons-material/Pets';
import SaveIcon from '@mui/icons-material/Save';
import { Pet, PetFormData } from '../../../shared/types/pet.types';

interface PetFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (petData: PetFormData) => Promise<void>;
    pet?: Pet | null; // If provided, we're editing; if null/undefined, we're creating
    loading?: boolean;
}

export default function PetFormDialog({
    open,
    onClose,
    onSubmit,
    pet = null,
    loading = false
}: PetFormDialogProps) {
    // Form state - initialize with pet data if editing, or defaults if creating
    const [formData, setFormData] = useState<PetFormData>({
        name: '',
        type: '',
        breed: '',
        age: 0,
        weight: 0,
        activityLevel: '',
        healthIssues: 'None',
        imageUrl: '',
        isDesexed: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState<string>('');

    // Determine if we're in edit mode
    const isEditMode = pet !== null;
    const dialogTitle = isEditMode ? `Edit ${pet?.name} 🐾` : 'Add New Pet 🐕';

    // Reset form when dialog opens/closes or pet changes
    useEffect(() => {
        if (open) {
            if (isEditMode && pet) {
                // Populate form with existing pet data
                setFormData({
                    name: pet.name,
                    type: pet.type,
                    breed: pet.breed,
                    age: pet.age,
                    weight: pet.weight,
                    activityLevel: pet.activityLevel,
                    healthIssues: pet.healthIssues || 'None',
                    imageUrl: pet.imageUrl || '',
                    isDesexed: pet.isDesexed
                });
            } else {
                // Reset to defaults for new pet
                setFormData({
                    name: '',
                    type: '',
                    breed: '',
                    age: 0,
                    weight: 0,
                    activityLevel: '',
                    healthIssues: 'None',
                    imageUrl: '',
                    isDesexed: false
                });
            }
            setErrors({});
            setSubmitError('');
        }
    }, [open, pet, isEditMode]);

    // Handle input changes
    const handleInputChange = useCallback((field: keyof PetFormData, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    }, [errors]);

    // Form validation
    const validateForm = useCallback((): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Pet name is required';
        }

        if (!formData.type) {
            newErrors.type = 'Pet type is required';
        }

        if (!formData.breed.trim()) {
            newErrors.breed = 'Breed is required';
        }

        if (formData.age <= 0) {
            newErrors.age = 'Age must be greater than 0';
        }

        if (formData.weight <= 0) {
            newErrors.weight = 'Weight must be greater than 0';
        }

        if (!formData.activityLevel) {
            newErrors.activityLevel = 'Activity level is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Handle form submission
    const handleSubmit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setSubmitError('');
            await onSubmit(formData);
            onClose(); // Close dialog on successful submission
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An error occurred');
        }
    }, [validateForm, onSubmit, formData, onClose]);

    // Get emoji for pet type
    const getPetEmoji = useCallback((type: string) => {
        switch (type.toLowerCase()) {
            case 'dog': return '🐕';
            case 'cat': return '🐱';
            default: return '🐾';
        }
    }, []);

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
                    border: '1px solid rgba(210, 105, 30, 0.1)',
                    boxShadow: '0 24px 48px rgba(139, 69, 19, 0.15)'
                }
            }}
        >
            {/* Dialog Header */}
            <DialogTitle sx={{
                pb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(45deg, rgba(210, 105, 30, 0.05) 30%, rgba(205, 133, 63, 0.05) 90%)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PetsIcon sx={{ color: '#D2691E', fontSize: '2rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#8B4513' }}>
                        {dialogTitle}
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#8B4513',
                        '&:hover': { background: 'rgba(210, 105, 30, 0.1)' }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider sx={{ borderColor: 'rgba(210, 105, 30, 0.1)' }} />

            <DialogContent sx={{ pt: 3 }}>
                {/* Error Alert */}
                {submitError && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {submitError}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Basic Information Section */}
                    <Box>
                        <Typography variant="h6" sx={{
                            color: '#8B4513',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            📝 Basic Information
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Pet Name */}
                            <TextField
                                label="Pet Name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                                placeholder="e.g., Buddy, Whiskers"
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>🏷️</Typography>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#D2691E'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#D2691E'
                                        }
                                    }
                                }}
                            />

                            {/* Pet Type and Breed Row */}
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <FormControl fullWidth error={!!errors.type}>
                                    <InputLabel>Pet Type</InputLabel>
                                    <Select
                                        value={formData.type}
                                        label="Pet Type"
                                        onChange={(e) => handleInputChange('type', e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#D2691E'
                                            }
                                        }}
                                    >
                                        <MenuItem key="dog" value="dog">🐕 Dog</MenuItem>
                                        <MenuItem key="cat" value="cat">🐱 Cat</MenuItem>
                                    </Select>
                                    {errors.type && (
                                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                            {errors.type}
                                        </Typography>
                                    )}
                                </FormControl>

                                <TextField
                                    label="Breed"
                                    value={formData.breed}
                                    onChange={(e) => handleInputChange('breed', e.target.value)}
                                    error={!!errors.breed}
                                    helperText={errors.breed}
                                    fullWidth
                                    placeholder="e.g., Golden Retriever, Persian"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#D2691E'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#D2691E'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Physical Information Section */}
                    <Box>
                        <Typography variant="h6" sx={{
                            color: '#8B4513',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            📏 Physical Information
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Age (years)"
                                type="number"
                                value={formData.age}
                                onChange={(e) => handleInputChange('age', parseFloat(e.target.value) || 0)}
                                error={!!errors.age}
                                helperText={errors.age}
                                fullWidth
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>🎂</Typography>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#D2691E'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#D2691E'
                                        }
                                    }
                                }}
                            />

                            <TextField
                                label="Weight (kg)"
                                type="number"
                                value={formData.weight}
                                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                                error={!!errors.weight}
                                helperText={errors.weight}
                                fullWidth
                                inputProps={{ min: 0, step: 0.1 }}
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>⚖️</Typography>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#D2691E'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#D2691E'
                                        }
                                    }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Health & Activity Section */}
                    <Box>
                        <Typography variant="h6" sx={{
                            color: '#8B4513',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            🏃‍♂️ Health & Activity
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControl fullWidth error={!!errors.activityLevel}>
                                <InputLabel>Activity Level</InputLabel>
                                <Select
                                    value={formData.activityLevel}
                                    label="Activity Level"
                                    onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                                    sx={{
                                        borderRadius: 2,
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#D2691E'
                                        }
                                    }}
                                >
                                    <MenuItem key="low" value="low">🐌 Low - Prefers lounging</MenuItem>
                                    <MenuItem key="moderate" value="moderate">🚶 Moderate - Regular walks</MenuItem>
                                    <MenuItem key="high" value="high">🏃 High - Very active</MenuItem>
                                </Select>
                                {errors.activityLevel && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                        {errors.activityLevel}
                                    </Typography>
                                )}
                            </FormControl>

                            <TextField
                                label="Health Issues"
                                value={formData.healthIssues}
                                onChange={(e) => handleInputChange('healthIssues', e.target.value)}
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="e.g., Allergies, Hip dysplasia, or 'None' if healthy"
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }}>🏥</Typography>
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: '#D2691E'
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#D2691E'
                                        }
                                    }
                                }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isDesexed}
                                        onChange={(e) => handleInputChange('isDesexed', e.target.checked)}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#D2691E',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(210, 105, 30, 0.04)',
                                                },
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#D2691E',
                                            },
                                        }}
                                    />
                                }
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography>✂️</Typography>
                                        <Typography>Is Desexed/Neutered</Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    </Box>

                    {/* Optional Image URL */}
                    <Box>
                        <Typography variant="h6" sx={{
                            color: '#8B4513',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            📸 Photo (Optional)
                        </Typography>

                        <TextField
                            label="Image URL"
                            value={formData.imageUrl}
                            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                            fullWidth
                            placeholder="https://example.com/pet-photo.jpg"
                            InputProps={{
                                startAdornment: <Typography sx={{ mr: 1 }}>🖼️</Typography>
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#D2691E'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#D2691E'
                                    }
                                }
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: '#8B4513',
                        borderRadius: 2,
                        px: 3,
                        '&:hover': {
                            background: 'rgba(139, 69, 19, 0.04)'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? null : <SaveIcon />}
                    sx={{
                        background: 'linear-gradient(45deg, #D2691E 30%, #CD853F 90%)',
                        borderRadius: 2,
                        px: 4,
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(45deg, #CD853F 30%, #D2691E 90%)',
                        },
                        '&:disabled': {
                            background: 'rgba(210, 105, 30, 0.3)'
                        }
                    }}
                >
                    {loading ? 'Saving...' : (isEditMode ? `Save Changes ${getPetEmoji(formData.type)}` : `Add Pet ${getPetEmoji(formData.type)}`)}
                </Button>
            </DialogActions>
        </Dialog>
    );
} 