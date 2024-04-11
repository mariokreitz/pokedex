const spriteContainer = document.getElementById('sprite-container');
const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const speed = document.getElementById('speed');
const types = document.getElementById('types');

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await response.json();
    //console.log(data);

    //current pokemon info
    pokemonId.textContent = data.id;
    pokemonName.textContent = data.name.toUpperCase();
    weight.textContent = data.weight;
    height.textContent = data.height;
    spriteContainer.innerHTML = `<img id="sprite" src="${
      data.sprites.front_default
    }" title="${data.name.toUpperCase()}" alt="${data.name} front default sprite" />`;

    //current pokemon stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    //current pokemen type
    types.innerHTML = data.types
      .map((pokemon) => `<span class="type ${pokemon.type.name}">${pokemon.type.name}</span>`)
      .join('');
  } catch (error) {
    defaultDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${error}`);
  }
};

const defaultDisplay = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  // reset pokedex display
  pokemonId.textContent = '';
  pokemonName.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  speed.textContent = '';
  types.textContent = '';
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  //defaultDisplay();
  getPokemon();
});
