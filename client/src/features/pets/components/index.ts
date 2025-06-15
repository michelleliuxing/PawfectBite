/**
 * Pet Components Index
 * 
 * Centralized exports for all pet-related components.
 * This allows for cleaner imports throughout the application.
 * 
 * Usage:
 * import { PetCard, PetFormDialog, DeleteConfirmDialog } from '../features/pets/components';
 */

export { default as PetCard } from './PetCard';
export { default as PetFormDialog } from './PetFormDialog';
export { default as DeleteConfirmDialog } from './DeleteConfirmDialog';

// Re-export types for convenience
export type { PetCardProps } from '../../../shared/types/pet.types'; 