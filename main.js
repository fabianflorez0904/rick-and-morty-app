import { fetchCharacters } from "./js/api.js";
import { currentFilters, setupFilters } from "./js/filters.js";
import { setupPagination } from "./js/pagination.js";

document.addEventListener('DOMContentLoaded',()=>{
    setupPagination();
    fetchCharacters();
    setupFilters();
});