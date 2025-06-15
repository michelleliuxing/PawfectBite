/**
 * API Service Layer
 * 
 * This service provides a centralized way to handle all HTTP requests to the backend API.
 * It uses Axios for HTTP client functionality and implements common patterns like:
 * - Request/Response interceptors for authentication and error handling
 * - Centralized configuration (base URL, timeout, headers)
 * - Type-safe API methods for all endpoints
 * - Singleton pattern for consistent usage across the app
 * 
 * Architecture Benefits:
 * - Separation of concerns (API logic separate from components)
 * - Reusable and maintainable code
 * - Centralized error handling
 * - Easy to mock for testing
 * - Type safety with TypeScript
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Pet, PetFormData, Recipe } from '../types/pet.types';

/**
 * API Service Class
 * 
 * Handles all HTTP communication with the backend API.
 * Implements singleton pattern - one instance shared across the application.
 */
class ApiService {
    private api: AxiosInstance; // Private Axios instance with custom configuration

    /**
     * Constructor - Sets up the Axios instance with configuration and interceptors
     * Only called once due to singleton pattern
     */
    constructor() {
        // Create Axios instance with base configuration
        this.api = axios.create({
            baseURL: 'https://localhost:5001/api',          // Base URL for all API calls
            timeout: 10000,                                 // 10 second timeout for requests
            headers: {
                'Content-Type': 'application/json',         // Default content type
            },
        });

        // REQUEST INTERCEPTOR
        // Automatically adds authentication token to all outgoing requests
        this.api.interceptors.request.use(
            (config) => {
                // Add auth token if available in localStorage
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // RESPONSE INTERCEPTOR  
        // Handles common response scenarios and errors globally
        this.api.interceptors.response.use(
            (response) => response,                         // Pass through successful responses
            (error) => {
                // Handle common HTTP errors globally
                if (error.response?.status === 401) {
                    // Handle unauthorized access - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }

    // ==========================================
    // PET-RELATED API METHODS
    // ==========================================

    /**
     * Fetches all pets from the API
     * 
     * @returns {Promise<Pet[]>} Array of all pets
     * @throws {Error} If the API request fails
     */
    async getPets(): Promise<Pet[]> {
        const response: AxiosResponse<Pet[]> = await this.api.get('/pets');
        return response.data;
    }

    /**
     * Fetches a single pet by ID
     * 
     * @param {string} id - The unique identifier of the pet
     * @returns {Promise<Pet>} The pet object
     * @throws {Error} If pet not found or API request fails
     */
    async getPetById(id: string): Promise<Pet> {
        const response: AxiosResponse<Pet> = await this.api.get(`/pets/${id}`);
        return response.data;
    }

    /**
     * Creates a new pet
     * 
     * @param {PetFormData} petData - The pet data to create
     * @returns {Promise<Pet>} The created pet with generated ID
     * @throws {Error} If validation fails or API request fails
     */
    async createPet(petData: PetFormData): Promise<Pet> {
        const response: AxiosResponse<Pet> = await this.api.post('/pets', petData);
        return response.data;
    }

    /**
     * Updates an existing pet
     * 
     * @param {string} id - The ID of the pet to update
     * @param {Partial<PetFormData>} petData - The partial pet data to update
     * @returns {Promise<Pet>} The updated pet object
     * @throws {Error} If pet not found or API request fails
     */
    async updatePet(id: string, petData: Partial<PetFormData>): Promise<Pet> {
        const response: AxiosResponse<Pet> = await this.api.put('/pets', { ...petData, id });
        return response.data;
    }

    /**
     * Deletes a pet by ID
     * 
     * @param {string} id - The ID of the pet to delete
     * @returns {Promise<void>} No return value on success
     * @throws {Error} If pet not found or API request fails
     */
    async deletePet(id: string): Promise<void> {
        await this.api.delete(`/pets/${id}`);
    }

    // ==========================================
    // RECIPE-RELATED API METHODS (Future Implementation)
    // ==========================================
    // These methods are placeholders for future recipe functionality

    /**
     * Fetches recipes for a specific pet
     * 
     * @param {string} petId - The ID of the pet
     * @returns {Promise<Recipe[]>} Array of recipes for the pet
     * @todo Implement when recipe backend endpoints are ready
     */
    async getRecipesForPet(petId: string): Promise<Recipe[]> {
        const response = await this.api.get(`/pets/${petId}/recipes`);
        return response.data;
    }

    /**
     * Generates a new recipe for a specific pet
     * 
     * @param {string} petId - The ID of the pet
     * @returns {Promise<Recipe>} The generated recipe
     * @todo Implement when recipe generation backend endpoint is ready
     */
    async generateRecipe(petId: string): Promise<Recipe> {
        const response = await this.api.post(`/pets/${petId}/generate-recipe`);
        return response.data;
    }
}

// ==========================================
// SINGLETON EXPORT
// ==========================================
// Export a single instance to be used throughout the application
// This ensures consistent configuration and prevents multiple instances

/**
 * Singleton instance of the API service
 * Use this instance throughout the application for all API calls
 * 
 * Example usage:
 * import { apiService } from '../services/api.service';
 * const pets = await apiService.getPets();
 */
export const apiService = new ApiService();

/**
 * Default export for alternative import syntax
 * Both exports point to the same singleton instance
 */
export default apiService; 