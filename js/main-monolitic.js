const btnFirst = document.getElementById('first-page');
const btnPrev = document.getElementById('prev-page');

const btnNext = document.getElementById('next-page');
const btnLast = document.getElementById('last-page');

const searchTypeSelect = document.getElementById('search-type');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const statusInput = document.getElementById('status-select');
const genderInput = document.getElementById('gender-select');

const clearBrn = document.getElementById('clear-search');
const noCharactersMessage = document.getElementById('no-characters-message');

const placeholders = {
    name: "Search character...",
    species: "Search species...",
    type: "Search type..."
};

let currentFilters = {
    field: '',
    value: '',
    status: '',
    gender: '',
    currentPage: 1,
    totalPages: 1,
}

searchTypeSelect.addEventListener('change',()=>{
    const selected = searchTypeSelect.value;
    searchInput.placeholder = placeholders[selected];
});

searchBtn.addEventListener('click',()=>{
    const field = searchTypeSelect.value;
    const value = searchInput.value.trim();
    const status = statusInput.value.trim();
    const gender = genderInput.value.trim();
    
    if(value || status || gender){
        currentFilters.field = field;
        currentFilters.value = value;
        currentFilters.status = status;
        currentFilters.gender = gender;
        fetchCharacters(1);
    }
});

clearBrn.addEventListener('click',()=>{
    
    // Reset currentFilters
    currentFilters.field = '';
    currentFilters.value = '';
    currentFilters.status = '';
    currentFilters.gender = '';
    
    // Reset HTML inputs
    searchInput.value = '';
    statusInput.value = '';
    genderInput.value = '';
    searchInput.placeholder = placeholders.name;
    searchTypeSelect.value = 'name';
    
    fetchCharacters();
});

btnFirst.addEventListener('click',()=>{
    fetchCharacters(1);
});

btnLast.addEventListener('click',()=>{
    fetchCharacters(currentFilters.totalPages);
});


btnPrev.addEventListener('click',()=>{
    if (currentFilters.currentPage > 1) {
        fetchCharacters(currentFilters.currentPage-1);
    }
});


btnNext.addEventListener('click',()=>{
    if (currentFilters.currentPage < currentFilters.totalPages) {
        fetchCharacters(currentFilters.currentPage+1);
    }
});


fetchCharacters();


function composeCharacterUrl(page=1){
    let url = 'https://rickandmortyapi.com/api/character?';
    url = url+`page=${page}`;     
    if (currentFilters.value){
        url = url+`&${currentFilters.field}=${encodeURIComponent(currentFilters.value)}`;   
    }
    if (currentFilters.status){
        url = url+`&status=${encodeURIComponent(currentFilters.status)}`;
    }
    if (currentFilters.gender){
        url = url+`&gender=${encodeURIComponent(currentFilters.gender)}`;
    }
    return url
}

function fetchCharacters(page = 1){
    fetch(composeCharacterUrl(page))
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (!isRenderErrorHidden()) hiddenRenderError();//Si el error no esta oculto lo ocultamos
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

function updatePagination(){
    document.getElementById('current-page').textContent = currentFilters.currentPage;
    document.getElementById('total-pages').textContent = currentFilters.totalPages;

    // desactivar botones si estamos en los extremos
    btnFirst.disabled = currentFilters.currentPage === 1;
    btnPrev.disabled = currentFilters.currentPage === 1;
    btnNext.disabled = currentFilters.currentPage === currentFilters.totalPages;
    btnLast.disabled = currentFilters.currentPage === currentFilters.totalPages;
}

function isRenderErrorHidden(){
    return document.getElementById('no-characters-message').classList.contains('hidden-div');
}

function hiddenRenderError(){
    const sectionContainerCharacters = document.getElementById('personajes');
    const containerCharacters = document.getElementById('character-list');
    containerCharacters.innerHTML = '';

    const noCharactersMessage = document.getElementById('no-characters-message');
    
    // Remove the 'hidden-div' class and add the 'show' class to trigger the transition
    noCharactersMessage.classList.remove('show');
    noCharactersMessage.classList.add('hidden-div');

    // sectionContainerCharacters.insertBefore(noCharactersMessage, sectionContainerCharacters.firstChild);
}

function renderError() {
    const sectionContainerCharacters = document.getElementById('personajes');
    const containerCharacters = document.getElementById('character-list');
    containerCharacters.innerHTML = '';

    const noCharactersMessage = document.getElementById('no-characters-message');
    
    // Remove the 'hidden-div' class and add the 'show' class to trigger the transition
    noCharactersMessage.classList.remove('hidden-div');
    noCharactersMessage.classList.add('show');

    sectionContainerCharacters.insertBefore(noCharactersMessage, sectionContainerCharacters.firstChild);
}

function renderCharacters(personajes){
    const containerCharacters = document.getElementById('character-list');
    containerCharacters.innerHTML = '';

    personajes.forEach(personaje => {
        // Cramos la tarjeta donde va a ir el personaje
        const charCardDiv = document.createElement('div');
        charCardDiv.classList.add('character-card');
        
        containerCharacters.appendChild(charCardDiv);

        // creamos la imagen
        const charImageDiv = document.createElement('div');
        charImageDiv.classList.add('character-image');

        const img = document.createElement('img');
        img.src = personaje.image;
        img.alt = `Foto del personaje ${personaje.name}`;
        img.classList.add('character-img');

        charImageDiv.appendChild(img);
        charCardDiv.appendChild(charImageDiv);

        // Creamos el div donde va a ir la informacion
        const infoChar = document.createElement('div');
        infoChar.classList.add('character-info');
        //<h2 class="character-name">Rick Sanchez</h2>
        const nameChar = document.createElement('h2');
        nameChar.classList.add('character-name');
        nameChar.textContent = personaje.name;
        
        infoChar.appendChild(nameChar);
        charCardDiv.appendChild(infoChar);

        const charStatusDiv = document.createElement('div');
        charStatusDiv.classList.add('character-status-container');
        const charStatusIndiSpan = document.createElement('span');
        charStatusIndiSpan.classList.add('status-indicator');
        charStatusIndiSpan.classList.add(personaje.status.toLowerCase());
        
        const charStatusTextSpan = document.createElement('span');
        charStatusTextSpan.classList.add('status-text');
        charStatusTextSpan.textContent = personaje.status;

        charStatusDiv.appendChild(charStatusIndiSpan);
        charStatusDiv.appendChild(charStatusTextSpan);

        infoChar.appendChild(charStatusDiv);

        const charDetailsDiv = document.createElement('div');
        charDetailsDiv.classList.add('character-details');


        // 1. Especie
        const especieItem = document.createElement('div');
        especieItem.classList.add('detail-item');

        const especieLabel = document.createElement('span');
        especieLabel.classList.add('detail-label');
        especieLabel.textContent = 'Especie: ';

        const especieValor = document.createElement('span');
        especieValor.classList.add('detail-value');
        especieValor.textContent = personaje.species;

        especieItem.appendChild(especieLabel);
        especieItem.appendChild(especieValor);
        charDetailsDiv.appendChild(especieItem);

        // 2. Genero
        const generoItem = document.createElement('div');
        generoItem.classList.add('detail-item');
        const generoLabel = document.createElement('span');
        generoLabel.classList.add('detail-label');
        generoLabel.textContent = 'Genero: ';
        const generoValor = document.createElement('span');
        generoValor.classList.add('detail-value');
        generoValor.textContent = personaje.gender;

        generoItem.appendChild(generoLabel);
        generoItem.appendChild(generoValor);
        charDetailsDiv.appendChild(generoItem);


        // 3. Origen
        const origenItem = document.createElement('div');
        origenItem.classList.add('detail-item');
        const origenLabel = document.createElement('span');
        origenLabel.classList.add('detail-label');
        origenLabel.textContent = 'Origen: ';
        const origenValor = document.createElement('span');
        origenValor.classList.add('detail-value');
        origenValor.textContent = personaje.origin.name;

        origenItem.appendChild(origenLabel);
        origenItem.appendChild(origenValor);
        charDetailsDiv.appendChild(origenItem);

        // 4. Ubicación
        const ubicacionItem = document.createElement('div');
        ubicacionItem.classList.add('detail-item');
        const ubicacionLabel = document.createElement('span');
        ubicacionLabel.classList.add('detail-label');
        ubicacionLabel.textContent = 'Ubicación: ';
        const ubicacionValor = document.createElement('span');
        ubicacionValor.classList.add('detail-value');
        ubicacionValor.textContent = personaje.location.name;

        ubicacionItem.appendChild(ubicacionLabel);
        ubicacionItem.appendChild(ubicacionValor);
        charDetailsDiv.appendChild(ubicacionItem);

        infoChar.appendChild(charDetailsDiv);

        const charEpisodesDiv = document.createElement('div');
        charEpisodesDiv.classList.add('character-episodes');

        const episodesCount = document.createElement('span');
        episodesCount.classList.add('episodes-count');
        const numEpisodios = personaje.episode.length;
        episodesCount.textContent = `Appears in ${numEpisodios} ${numEpisodios === 1?'episode':'episodes'}`;

        
        charEpisodesDiv.appendChild(episodesCount);

        infoChar.appendChild(episodesCount);


    });
}

    