const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;



function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="abrirModal('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                
            </div>
            
            
        </li>
        <div id="vis-modal-${pokemon.name}" class="modal">
                <div class="conteudo-modal">
                    <span class="modal-fechar" onclick="fecharModal('vis-modal-${pokemon.name}')">X</span>
                    <div class="corpo-modal ${pokemon.type}">
                        <h2 class="titulo-modal">${pokemon.name}</h2>
                        <img class="imagem-modal" src="${pokemon.photo}" alt="${pokemon.name}">
                            <div class="detalhes-modal">
                                <div class="types-modal">
                                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                </div>
                                <div class="stats-modal">
                                    <div class="nameStats">${pokemon.stats.map((stat) => `<li class="stat ${stat}">${stat}</li>`).join('')}</div>
                                    <div class="valueStats">${pokemon.valores.map((valor) => `<li class="stat ${valor}">${valor}</li>`).join('')}</div>
                                </div>
                                   
                            </div>
                    </div>
                </div>
        </div>
    `;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function abrirModal(pokemonName) {
    let modal = document.getElementById(`vis-modal-${pokemonName}`);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Preencha os detalhes do modal com as informações do Pokémon
    const pokemon = encontrarPokemonPorNome(pokemonName);
    document.querySelector(`#vis-modal-${pokemonName} .titulo-modal`).textContent = pokemon.name;

    const typesList = document.querySelector(`#vis-modal-${pokemonName} .types-modal`);
    typesList.innerHTML = '';
    pokemon.types.forEach(type => {
        const li = document.createElement('li');
        li.className = `type ${type}`;
        li.textContent = type;
        typesList.appendChild(li);
    });

    const statsList = document.querySelector(`#vis-modal-${pokemonName} .stats-modal`);
    statsList.innerHTML = '';
    pokemon.stats.forEach(stat => {
        const li = document.createElement('li');
        li.className = `stat ${stat}`;
        li.textContent = stat;
        statsList.appendChild(li);
    });

    // Outros detalhes do modal
}

document.querySelector('.imagem-modal').src = pokemon.photo;

function fecharModal(fecharModal) {
    let modal = document.getElementById(fecharModal)
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';


}




