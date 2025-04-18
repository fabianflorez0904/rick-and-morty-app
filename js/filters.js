/**
 * @file filters.js
 * @description This module manages the filtering system for character searches in the Rick and Morty application.
 * It exports the currentFilters object which tracks the active search parameters and pagination state.
 * 
 * The module is responsible for:
 * - Maintaining the current search criteria (field, value, status, gender)
 * - Tracking pagination state (current page and total pages)
 * - Providing a centralized state management for character filtering
 * 
 * @module filters
 */

import { fetchCharacters } from "./api.js";

export const currentFilters = {
    field: '',
    value: '',
    status: '',
    gender: '',
    currentPage: 1,
    totalPages: 1,
};

export function setupFilters() {
    const searchTypeSelect = document.getElementById('search-type');
    const searchInput = document.getElementById('search-input');
    const statusInput = document.getElementById('status-select');
    const genderInput = document.getElementById('gender-select');
    const searchBtn = document.getElementById('search-btn');
    const clearBtn = document.getElementById('clear-search');

    const placeholders = {
        name: "Search character...",
        species: "Search species...",
        type: "Search type..."
    };

    searchTypeSelect.addEventListener('change', () => {
        const selected = searchTypeSelect.value;
        searchInput.placeholder = placeholders[selected];
    });

    searchBtn.addEventListener('click', () => {
        currentFilters.field = searchTypeSelect.value;
        currentFilters.value = searchInput.value.trim();
        currentFilters.status = statusInput.value.trim();
        currentFilters.gender = genderInput.value.trim();
        fetchCharacters(1);
    });

    clearBtn.addEventListener('click', () => {
        currentFilters.field = '';
        currentFilters.value = '';
        currentFilters.status = '';
        currentFilters.gender = '';
        searchTypeSelect.value = 'name';
        searchInput.value = '';
        statusInput.value = '';
        genderInput.value = '';
        searchInput.placeholder = placeholders.name;

        fetchCharacters(1);
    });
}