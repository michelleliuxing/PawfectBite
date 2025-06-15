/**
 * Types Index File (Barrel Export)
 * 
 * This file serves as a central export point for all type definitions in the types directory.
 * It implements the "barrel export" pattern which provides several benefits:
 * 
 * Benefits:
 * - Cleaner imports: import { Pet, PetFormData } from '../types' instead of '../types/pet.types'
 * - Single source of truth for type exports
 * - Easier to reorganize internal file structure without breaking imports
 * - Better developer experience with shorter import paths
 * 
 * Usage Examples:
 * import { Pet, PetFormData, PetCardProps } from '../shared/types';
 * import type { Pet } from '../shared/types'; // For type-only imports
 */

// Export all pet-related types and interfaces
export * from './pet.types'; 