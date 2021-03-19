let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let modalContainer = document.querySelector('#modal-container');
  let iPokedex = 1;

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
    let pkmName = capitalizeFirstLetter(pokemon.name);

    let pkmId =
      iPokedex < 10
        ? `#00${iPokedex} ${pkmName}`
        : iPokedex >= 10 && iPokedex < 100
        ? `#0${iPokedex} ${pkmName}`
        : `#${iPokedex} ${pkmName}`;

    button.innerText = pkmId;
    button.classList.add('btn-dex');
    listPokemon.appendChild(button);
    unorderedList.appendChild(listPokemon);
    pokedexListener(button, pokemon);
    iPokedex++;
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
    let url = pokemon.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();

      pokemon.id = details.id;
      pokemon.name = capitalizeFirstLetter(details.name);
      pokemon.imageUrl =
        details['sprites']['other']['official-artwork']['front_default'];
      pokemon.height = details.height / 10;
      pokemon.weight = details.weight / 10;

      /*
      pokemon.type1 = capitalizeFirstLetter(details.types[0].type.name);
      pokemon.type2 = capitalizeFirstLetter(details.types[1].type.name);
      */

      hideLoadingMessage();
      console.log(pokemon);
    } catch (e) {
      console.error(e);
      hideLoadingMessage();
    }
  }

  // Shows information about the consulted Pokémon (Console)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Close Button
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideDetails);

      // Pokémon Image
      let pkmImg = document.createElement('img');
      pkmImg.src = pokemon.imageUrl;
      pkmImg.alt = pokemon.name;

      // Pokémon ID + Name
      let pkmIdName = document.createElement('h1');
      let pkmId =
        pokemon.id < 10
          ? `#00${pokemon.id} ${pokemon.name}`
          : pokemon.id >= 10 && pokemon.id < 100
          ? `#0${pokemon.id} ${pokemon.name}`
          : `#${pokemon.id} ${pokemon.name}`;
      pkmIdName.innerText = pkmId;

      /*
      // Pokémon Types
      let pkmTypes = document.createElement('p');
      pokemon.type2 === undefined
        ? (pkmTypes.innerText = `${pokemon.type1}`)
        : (pkmTypes.innerText = `${pokemon.type1} / ${pokemon.type2}`);
      */

      // Pokémon Height
      let pkmHeight = document.createElement('p');
      pkmHeight.innerText = `Height: ${pokemon.height} m`;

      // Pokémon Weight
      let pkmWeight = document.createElement('p');
      pkmWeight.innerText = `Weight: ${pokemon.weight} kg`;

      // Append
      modal.append(
        closeButtonElement,
        pkmImg,
        pkmIdName,
        //pkmTypes,
        pkmHeight,
        pkmWeight
      );
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  function hideDetails() {
    modalContainer.classList.remove('is-visible');
  }

  function showLoadingMessage() {
    let pokedex = document.querySelector('#pokedex');
    let message = document.createElement('div');
    message.id = 'message';
    pokedex.insertBefore(message, pokedex.firstChild);
  }

  function hideLoadingMessage() {
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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideDetails();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideDetails();
    }
  });

  // Tools
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Return
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
