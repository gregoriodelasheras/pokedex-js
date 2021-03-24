let pokemonRepository = (function () {
  let pokedex = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898';
  let apiUrlGen1 = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
  let apiUrlGen2 = 'https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100';
  let apiUrlGen3 = 'https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135';
  let apiUrlGen4 = 'https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107';
  let apiUrlGen5 = 'https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156';
  let apiUrlGen6 = 'https://pokeapi.co/api/v2/pokemon/?offset=649&limit=72';
  let apiUrlGen7 = 'https://pokeapi.co/api/v2/pokemon/?offset=721&limit=88';
  let apiUrlGen8 = 'https://pokeapi.co/api/v2/pokemon/?offset=809&limit=89';
  let iPokedex = 1;

  // Load Pokédex
  async function loadPokedex() {
    try {
      const response = await fetch(apiUrlGen1);
      const json = await response.json();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        addPokemon(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  function addPokemon(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokedex.push(pokemon);
    } else {
      console.log(
        'Error in the Pokédex. The Pokémon data could not be loaded. Professor Oaks team will fix the problem as soon as possible.'
      );
    }
  }

  function getPokedex() {
    return pokedex;
  }

  // Print Pokédex in the browser
  function addPokedexEntry(pokemon) {
    let pkmName = capitalizeFirstLetter(pokemon.name);

    let pkmId =
      iPokedex < 10
        ? `#00${iPokedex} ${pkmName}`
        : iPokedex >= 10 && iPokedex < 100
        ? `#0${iPokedex} ${pkmName}`
        : `#${iPokedex} ${pkmName}`;

    let unorderedList = $('#pokedex');
    let listPokemon = $(
      `<li class="group-list-item col-12 col-sm-4 d-grid gap-2"></li>`
    );
    let button = $(
      `<button type="button" class="btn btn-danger m-2" 
      data-bs-toggle="modal" data-bs-target="#pokedexModal">
      ${pkmId}</button>`
    );

    listPokemon.append(button);
    unorderedList.append(listPokemon);
    iPokedex++;

    button.on('click', function () {
      showPokemon(pokemon);
    });
  }

  // Show details about a Pokémon
  function showPokemon(pokemon) {
    loadPokemonData(pokemon).then(function () {
      // Set modal
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      modalTitle.empty();
      modalBody.empty();

      showLoadingSpin();

      // Pokémon ID + Name
      let pkmId =
        pokemon.id < 10
          ? `#00${pokemon.id} ${pokemon.name}`
          : pokemon.id >= 10 && pokemon.id < 100
          ? `#0${pokemon.id} ${pokemon.name}`
          : `#${pokemon.id} ${pokemon.name}`;
      let pkmName = $(`<h1>${pkmId}</h1>`);
      // Pokémon Image
      let pkmImg = $(`<img class="modal-img pokemon-img" 
      src="${pokemon.imageUrl}" 
      alt="Image of ${pokemon.name}">`);
      // Pokémon Types
      let pkmTypes = `<p>Types: ${pokemon.types}</p>`;
      // Pokémon Height
      let pkmHeight = `<p>Height: ${pokemon.height} m</p>`;
      // Pokémon Weight
      let pkmWeight = `<p>Weight: ${pokemon.weight} kg</p>`;

      modalTitle.append(pkmName);
      modalBody.append(pkmImg, pkmTypes, pkmHeight, pkmWeight);
      removeLoadingSpin();
    });
  }

  // Load Data of each Pokémon
  async function loadPokemonData(pokemon) {
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

      // Needs improvement
      pokemon.types = [];
      for (var i = 0; i < details.types.length; i++) {
        pokemon.types.push(capitalizeFirstLetter(details.types[i].type.name));
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Tools
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showLoadingSpin() {
    let modalBody = $('.modal-body');
    let pokeSpin = $('<div id="poke-loader"></div>');
    modalBody.append(pokeSpin);
  }

  function removeLoadingSpin() {
    let pokeSpin = $('#poke-loader');
    pokeSpin.remove();
  }

  // Return
  return {
    loadPokedex: loadPokedex,
    addPokemon: addPokemon,
    getPokedex: getPokedex,
    addPokedexEntry: addPokedexEntry,
    showPokemon: showPokemon,
    loadPokemonData: loadPokemonData,
  };
})();

// Trigger the Pokédex in the browser
pokemonRepository.loadPokedex().then(function () {
  pokemonRepository.getPokedex().forEach(function (pokemon) {
    pokemonRepository.addPokedexEntry(pokemon);
  });
});

// Filter Pokédex by Pokémon name
$(document).ready(function () {
  $('#search-pokemon').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#pokedex li button').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
