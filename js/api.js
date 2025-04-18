/**
 * @file api.js
 * @description This module handles all API-related functionality for the Rick and Morty character finder application.
 * It provides functions for fetching character data from the Rick and Morty API and managing API requests.
 * 
 * The module exports:
 * - fetchCharacters: Main function to fetch character data with pagination and filtering
 * - buildUrl: Helper function to construct API URLs with filters
 * 
 * Dependencies:
 * - filters.js: For accessing current filter state
 * - render.js: For rendering character data and error states
 * - pagination.js: For updating pagination UI
 * 
 * @module api
 */

/**
 * Builds the API URL for character requests based on current filters and page number.
 * 
 * @param {number} page - The page number to fetch
 * @returns {string} The complete API URL with query parameters
 * 
 * @description
 * Constructs a URL for the Rick and Morty API with the following parameters:
 * - page: The requested page number
 * - name/species/type: Search term based on selected filter
 * - status: Character status filter
 * - gender: Character gender filter
 * 
 * Only includes parameters that have values to avoid unnecessary query parameters.
 * 
 * @example
 * // Basic URL with just page number
 * buildUrl(1) // returns "https://rickandmortyapi.com/api/character?page=1"
 * 
 * // URL with filters
 * buildUrl(1) // returns "https://rickandmortyapi.com/api/character?page=1&name=rick&status=alive"
 */
import {currentFilters} from './filters.js';
import {renderCharacters, renderError, hideError, isRenderErrorHidden } from './render.js';
import {updatePagination} from './pagination.js';

export function fetchCharacters(page = 1){
    /**
     * Fetches characters from the Rick and Morty API based on current filters and page number.
     * 
     * @param {number} [page=1] - The page number to fetch. Defaults to 1 if not specified.
     * 
     * @description
     * This function makes an API call to the Rick and Morty API to fetch character data.
     * It handles the response by:
     * - Hiding any existing error messages
     * - Rendering characters if successful
     * - Updating pagination information
     * - Handling errors appropriately
     * 
     * The function uses the current filters (field, value, status, gender) to build
     * the appropriate API URL through the buildUrl helper function.
     * 
     * @example
     * // Fetch first page of characters
     * fetchCharacters();
     * 
     * // Fetch specific page
     * fetchCharacters(2);
     */
    
    const url = buildUrl(page);
    
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (!isRenderErrorHidden()) hideError();//Si el error no esta oculto lo ocultamos
        if(data.error){
            renderError();
        }else{
            
            renderCharacters(data.results);
            currentFilters.currentPage = page;
            currentFilters.totalPages = data.info.pages;
            updatePagination();
        }
        })
        .catch(error=>{
            console.error('Error al cargar personajes: ',error);
    });
}

function buildUrl(page) {
    /**
     * Builds the URL for the Rick and Morty API character endpoint with current filters.
     * 
     * @param {number} page - The page number to include in the URL.
     * @returns {string} The complete URL with all query parameters.
     * 
     * @description
     * This helper function constructs the API URL by:
     * - Starting with the base character endpoint
     * - Adding the page number parameter
     * - Appending any active filters (field, value, status, gender)
     * - Properly encoding all parameters for URL safety
     * 
     * The function uses the currentFilters object to determine which
     * query parameters to include in the URL.
     * 
     * @example
     * // Basic URL with just page number
     * buildUrl(1); // Returns: "https://rickandmortyapi.com/api/character?page=1"
     * 
     * // URL with filters
     * // currentFilters = { field: "name", value: "Rick", status: "alive" }
     * buildUrl(2); // Returns: "https://rickandmortyapi.com/api/character?page=2&name=Rick&status=alive"
     */
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    const { field, value, status, gender } = currentFilters;
  
    if (value) url += `&${field}=${encodeURIComponent(value)}`;
    if (status) url += `&status=${encodeURIComponent(status)}`;
    if (gender) url += `&gender=${encodeURIComponent(gender)}`;
  
    return url;
}