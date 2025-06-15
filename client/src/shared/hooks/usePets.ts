/**
 * Custom React Hook for Pet Management
 * 
 * This hook provides a complete interface for managing pets in the application.
 * It encapsulates all pet-related state management, API calls, and error handling.
 * 
 * Features:
 * - Fetches pets from the API on mount
 * - Provides CRUD operations (Create, Read, Update, Delete)
 * - Manages loading states and error handling
 * - Optimistic UI updates for better user experience
 * - Automatic state synchronization after operations
 * 
 * Usage:
 * const { pets, loading, error, createPet, updatePet, deletePet } = usePets();
 */

import { useState, useEffect, useCallback } from 'react';
import { Pet, PetFormData } from '../types/pet.types';
import { apiService } from '../services/api.service';

/**
 * Return type interface for the usePets hook
 * Defines all the values and functions that the hook exposes
 */
interface UsePetsReturn {
    pets: Pet[];                                                  // Array of all pets
    loading: boolean;                                             // Loading state for async operations
    error: string | null;                                         // Error message if any operation fails
    fetchPets: () => Promise<void>;                               // Manually fetch pets from API
    createPet: (petData: PetFormData) => Promise<Pet | null>;     // Create a new pet
    updatePet: (id: string, petData: Partial<PetFormData>) => Promise<Pet | null>; // Update existing pet
    deletePet: (id: string) => Promise<boolean>;                  // Delete a pet
    refreshPets: () => Promise<void>;                             // Refresh the pets list
}

/**
 * Custom hook for managing pet data and operations
 * 
 * @returns {UsePetsReturn} Object containing pets data, loading state, error state, and CRUD functions
 */
export function usePets(): UsePetsReturn {
    // State management for pets data
    const [pets, setPets] = useState<Pet[]>([]);           // Stores the list of pets
    const [loading, setLoading] = useState(true);          // Tracks loading state for UI feedback
    const [error, setError] = useState<string | null>(null); // Stores error messages

    /**
     * Fetches all pets from the API
     * Uses useCallback to prevent unnecessary re-renders and dependency issues
     */
    const fetchPets = useCallback(async () => {
        try {
            setLoading(true);                               // Show loading indicator
            setError(null);                                 // Clear any previous errors
            const fetchedPets = await apiService.getPets(); // Call API service
            setPets(fetchedPets);                           // Update state with fetched data
        } catch (err) {
            // Handle errors gracefully with user-friendly messages
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pets';
            setError(errorMessage);
            console.error('Error fetching pets:', err);     // Log for debugging
        } finally {
            setLoading(false);                              // Hide loading indicator
        }
    }, []);

    /**
     * Creates a new pet
     * Implements optimistic UI updates - adds pet to local state immediately
     * 
     * @param {PetFormData} petData - The pet data to create
     * @returns {Promise<Pet | null>} The created pet or null if failed
     */
    const createPet = useCallback(async (petData: PetFormData): Promise<Pet | null> => {
        try {
            setError(null);                                 // Clear any previous errors
            const newPet = await apiService.createPet(petData); // Create pet via API
            setPets(prevPets => [...prevPets, newPet]);     // Add new pet to local state
            return newPet;                                  // Return created pet for further use
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create pet';
            setError(errorMessage);
            console.error('Error creating pet:', err);
            return null;                                    // Return null to indicate failure
        }
    }, []);

    /**
     * Updates an existing pet
     * Uses optimistic updates to immediately reflect changes in UI
     * 
     * @param {string} id - The ID of the pet to update
     * @param {Partial<PetFormData>} petData - The partial pet data to update
     * @returns {Promise<Pet | null>} The updated pet or null if failed
     */
    const updatePet = useCallback(async (id: string, petData: Partial<PetFormData>): Promise<Pet | null> => {
        try {
            setError(null);
            const updatedPet = await apiService.updatePet(id, petData); // Update via API
            // Update the specific pet in the local state array
            setPets(prevPets =>
                prevPets.map(pet => pet.id === id ? updatedPet : pet)
            );
            return updatedPet;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update pet';
            setError(errorMessage);
            console.error('Error updating pet:', err);
            return null;
        }
    }, []);

    /**
     * Deletes a pet
     * Removes pet from local state immediately for responsive UI
     * 
     * @param {string} id - The ID of the pet to delete
     * @returns {Promise<boolean>} True if successful, false if failed
     */
    const deletePet = useCallback(async (id: string): Promise<boolean> => {
        try {
            setError(null);
            await apiService.deletePet(id);                 // Delete via API
            setPets(prevPets => prevPets.filter(pet => pet.id !== id)); // Remove from local state
            return true;                                    // Indicate success
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete pet';
            setError(errorMessage);
            console.error('Error deleting pet:', err);
            return false;                                   // Indicate failure
        }
    }, []);

    /**
     * Refreshes the pets list by re-fetching from API
     * Useful for manual refresh or after external data changes
     */
    const refreshPets = useCallback(async () => {
        await fetchPets();
    }, [fetchPets]);

    /**
     * Effect hook to fetch pets when component mounts
     * Only runs once due to the useCallback dependency
     */
    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    // Return all the state and functions for components to use
    return {
        pets,           // Current pets array
        loading,        // Loading state
        error,          // Error message
        fetchPets,      // Manual fetch function
        createPet,      // Create function
        updatePet,      // Update function
        deletePet,      // Delete function
        refreshPets,    // Refresh function
    };
} 