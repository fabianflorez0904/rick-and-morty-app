/**
 * @file pagination.js
 * @description This module manages the pagination functionality for the Rick and Morty character finder application.
 * It provides functions for setting up pagination event listeners and updating the pagination UI state.
 * 
 * The module exports:
 * - setupPagination: Function to initialize pagination event listeners
 * - updatePagination: Function to update pagination UI based on current state
 * 
 * Dependencies:
 * - api.js: For fetching character data
 * - filters.js: For accessing current filter and pagination state
 * 
 * @module pagination
 */

import { fetchCharacters } from './api.js';
import { currentFilters } from './filters.js';

export function setupPagination() {
  /**
   * Sets up event listeners for pagination controls.
   * 
   * @description
   * This function initializes the pagination system by:
   * - Adding click event listeners to all pagination buttons
   * - Handling navigation to first, last, previous, and next pages
   * - Ensuring navigation only occurs when valid (e.g., not going to page 0)
   * 
   * The function sets up the following navigation controls:
   * - First page button: Jumps to page 1
   * - Last page button: Jumps to the last available page
   * - Previous page button: Decrements current page by 1
   * - Next page button: Increments current page by 1
   * 
   * Each button's click handler uses the fetchCharacters function to load
   * the appropriate page of characters from the API.
   * 
   * @example
   * // Initialize pagination controls
   * setupPagination();
   */
  document.getElementById('first-page').addEventListener('click', () => fetchCharacters(1));
  document.getElementById('last-page').addEventListener('click', () => fetchCharacters(currentFilters.totalPages));
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentFilters.currentPage > 1) fetchCharacters(currentFilters.currentPage - 1);
  });
  document.getElementById('next-page').addEventListener('click', () => {
    if (currentFilters.currentPage < currentFilters.totalPages) fetchCharacters(currentFilters.currentPage + 1);
  });
}

export function updatePagination() {
  /**
   * Updates the pagination UI based on the current state.
   * 
   * @description
   * This function updates the pagination interface by:
   * - Updating the current page and total pages display
   * - Enabling/disabling navigation buttons based on current page position
   * 
   * The function handles the following UI elements:
   * - Current page number display
   * - Total pages display
   * - First page button (disabled on page 1)
   * - Previous page button (disabled on page 1)
   * - Next page button (disabled on last page)
   * - Last page button (disabled on last page)
   * 
   * This function is called whenever:
   * - New character data is loaded
   * - The page number changes
   * - The total number of pages changes
   * 
   * @example
   * // Update pagination after loading new character data
   * updatePagination();
   */
  document.getElementById('current-page').textContent = currentFilters.currentPage;
  document.getElementById('total-pages').textContent = currentFilters.totalPages;

  document.getElementById('first-page').disabled = currentFilters.currentPage === 1;
  document.getElementById('prev-page').disabled = currentFilters.currentPage === 1;
  document.getElementById('next-page').disabled = currentFilters.currentPage === currentFilters.totalPages;
  document.getElementById('last-page').disabled = currentFilters.currentPage === currentFilters.totalPages;
}