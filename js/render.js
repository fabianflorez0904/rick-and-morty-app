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
  const container = document.getElementById('character-list');
  container.innerHTML = '';
  personajes.forEach(p => container.appendChild(createCharacterCard(p)));
}

function createCharacterCard(p) {
  const card = document.createElement('article');
  card.className = 'bg-medium rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300';

  const statusColor = getStatusColor(p.status);

  card.innerHTML = `
    <div class="relative">
      <img src="${p.image}" alt="${p.name}" class="w-full h-56 object-cover">
      <div class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-dark text-sm rounded-full shadow-md">
        <span class="w-2 h-2 rounded-full ${statusColor}"></span>
        <span>${p.status}</span>
      </div>
    </div>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">${p.name}</h2>
      <ul class="text-sm space-y-1">
        <li><span class="text-textSecondary">Species:</span> ${p.species}</li>
        <li><span class="text-textSecondary">Gender:</span> ${p.gender}</li>
        <li><span class="text-textSecondary">Origin:</span> ${p.origin.name}</li>
        <li><span class="text-textSecondary">Location:</span> ${p.location.name}</li>
      </ul>
      <div class="pt-3">
        <span class="text-sm text-primary font-semibold">⭐ Appears in ${p.episode.length} episode${p.episode.length === 1 ? '' : 's'}</span>
      </div>
    </div>
  `;
  return card;
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'bg-green-500';
    case 'dead':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
}

export function renderError() {
  document.getElementById('character-list').innerHTML = '';
  document.getElementById('no-characters-message').classList.remove('hidden');
}

export function hideError() {
  document.getElementById('no-characters-message').classList.add('hidden');
}

export function isRenderErrorHidden() {
  return document.getElementById('no-characters-message').classList.contains('hidden');
}

export function showLoading() {
  document.getElementById('loading-indicator').classList.remove('hidden');
}

export function hideLoading() {
  document.getElementById('loading-indicator').classList.add('hidden');
}

