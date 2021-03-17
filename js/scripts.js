let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log(
        'Error in the Pokédex. The Pokémon data could not be loaded. Professor Oaks team will correct the error as soon as possible.'
      );
    }
  }

  function getAll() {
    return pokemonList;
  }

  // Listen Button Pokédex
  function pokedexListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Print Pokédex
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('#pokedex');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-dex');
    listPokemon.appendChild(button);
    unorderedList.appendChild(listPokemon);
    pokedexListener(button, pokemon);
  }

  // Load Pokédex
  async function loadList() {
    showLoadingMessage();
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
      hideLoadingMessage();
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }

  // Load details of each Pokédex entry
  async function loadDetails(pokemon) {
    showLoadingMessage();
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(2000);
    let url = pokemon.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      pokemon.id = details.id;
      pokemon.imageUrl =
        details['sprites']['other']['official-artwork']['front_default'];
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;
      hideLoadingMessage();
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }

  // Shows information about the consulted Pokémon (Console)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function showLoadingMessage() {
    console.log('Loading Data...');
    let pokedex = document.querySelector('#pokedex');
    let message = document.createElement('div');
    message.id = 'message';
    pokedex.insertBefore(message, pokedex.firstChild);
  }

  function hideLoadingMessage() {
    console.log('Data successfully loaded!');
    let pokedex = document.querySelector('#pokedex');
    let message = document.querySelector('#message');
    pokedex.removeChild(message);
  }

  // Removes the last registered Pokémon
  function remove() {
    console.log(
      `The last Pokémon ("${
        pokemonList[pokemonList.length - 1].name
      }") has been deleted`
    );
    pokemonList.pop();
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    remove: remove,
  };
})();

// Displays the Pokédex on the website
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
