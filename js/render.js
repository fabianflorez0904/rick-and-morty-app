/**
 * @file render.js
 * @description This module handles the rendering of character data in the Rick and Morty character finder application.
 * It provides functions for displaying character cards and managing error states in the UI.
 * 
 * The module exports:
 * - renderCharacters: Main function to render a list of characters
 * - renderError: Function to display error messages
 * - hideError: Function to hide error messages
 * 
 * Dependencies:
 * - None (pure DOM manipulation)
 * 
 * @module render
 */


export function renderCharacters(personajes) {
    /**
     * Renders a list of characters in the character-list container.
     * 
     * @param {Array} personajes - Array of character objects to be rendered
     * 
     * @description
     * This function:
     * 1. Gets the character-list container element
     * 2. Clears any existing content
     * 3. Iterates through each character in the array
     * 4. Creates a character card for each character using createCharacterCard
     * 5. Appends each card to the container
     * 
     * @example
     * // Render a list of characters
     * renderCharacters([
     *   { name: "Rick Sanchez", status: "Alive", ... },
     *   { name: "Morty Smith", status: "Alive", ... }
     * ]);
     */
    const container = document.getElementById('character-list');
    container.innerHTML = '';
    personajes.forEach(personaje => {
      const card = createCharacterCard(personaje);
      container.appendChild(card);
    });
  }

function createCharacterCard(p) {
  /**
   * Creates a character card element with the provided character data.
   * 
   * @param {Object} p - Character object containing all character information
   * @returns {HTMLElement} A div element containing the character card HTML structure
   * 
   * @description
   * This function creates a character card with the following sections:
   * - Character image
   * - Character name
   * - Status indicator and text
   * - Character details (species, gender, origin, location)
   * - Episode count
   * 
   * The card is styled using CSS classes and includes:
   * - Dynamic status indicator based on character status
   * - Proper alt text for accessibility
   * - Pluralization for episode count
   * 
   * @example
   * const character = {
   *   name: "Rick Sanchez",
   *   status: "Alive",
   *   species: "Human",
   *   gender: "Male",
   *   origin: { name: "Earth (C-137)" },
   *   location: { name: "Citadel of Ricks" },
   *   episode: ["episode1", "episode2", ...],
   *   image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
   * };
   * const card = createCharacterCard(character);
   */
  const div = document.createElement('div');
  div.classList.add('character-card');

  div.innerHTML = `
    <div class="character-image">
      <img src="${p.image}" alt="${p.name}" class="character-img" />
    </div>
    <div class="character-info">
      <h2 class="character-name">${p.name}</h2>
      <div class="character-status-container">
        <span class="status-indicator ${p.status.toLowerCase()}"></span>
        <span class="status-text">${p.status}</span>
      </div>
      <div class="character-details">
        <div class="detail-item"><span class="detail-label">Especie:</span> ${p.species}</div>
        <div class="detail-item"><span class="detail-label">Género:</span> ${p.gender}</div>
        <div class="detail-item"><span class="detail-label">Origen:</span> ${p.origin.name}</div>
        <div class="detail-item"><span class="detail-label">Ubicación:</span> ${p.location.name}</div>
      </div>
      <div class="character-episodes">
        <span class="episodes-count">Appears in ${p.episode.length} ${p.episode.length === 1 ? 'episode' : 'episodes'}</span>
      </div>
    </div>
  `;

  return div;
}

export function renderError() {
  /**
   * Renders an error message when no characters are found or when there's an API error.
   * 
   * @description
   * This function handles the display of error states by:
   * - Clearing the character list container
   * - Showing the "no characters found" message
   * 
   * The error message is displayed in a dedicated div that is normally hidden
   * and contains a user-friendly message suggesting to adjust search parameters.
   * 
   * @example
   * // When no characters match the search criteria
   * renderError();
   * 
   * // When the API returns an error
   * renderError();
   */
  document.getElementById('character-list').innerHTML = '';
  document.getElementById('no-characters-message').classList.remove('hidden-div');
}

export function hideError() {
  /**
   * Hides the error message element by adding the 'hidden-div' class.
   * 
   * @description
   * This function is responsible for hiding the error message that appears when no characters
   * are found or when there's an API error. It does this by adding the 'hidden-div' CSS class
   * to the error message element, which typically sets display: none.
   * 
   * This function is typically called when:
   * - New character data is successfully loaded
   * - Search filters are cleared
   * - The page is initially loaded
   * 
   * @example
   * // Hide error message after successful character fetch
   * hideError();
   */
  document.getElementById('no-characters-message').classList.add('hidden-div');
}

export function isRenderErrorHidden() {
    return document.getElementById('no-characters-message').classList.contains('hidden-div');
}