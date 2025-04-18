import { fetchCharacters } from "./js/api.js";
import { currentFilters, setupFilters } from "./js/filters.js";
import { setupPagination } from "./js/pagination.js";
import { setupScrollToTop,setupScrollDown,setupBurberButton } from "./js/ui.js";

document.addEventListener('DOMContentLoaded',()=>{
    setupScrollToTop();
    setupScrollDown();
    setupBurberButton();
    setupPagination();
    fetchCharacters();
    setupFilters();
});