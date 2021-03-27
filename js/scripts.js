// Pokédex IIFE
let pokemonRepository = (function () {
  let pokedex;

  // Load Pokédex data from the API URL
  async function loadPokedex(apiUrl) {
    // Reset with each generation query the pokedex array
    pokedex = [];
    try {
      const response = await fetch(apiUrl);
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

  // Return the Pokédex array outside the IIFE
  function getPokedex() {
    return pokedex;
  }

  // Add each Pokémon from the API to the Pokédex with every iteration.
  function addPokemon(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokedex.push(pokemon);
    } else {
      console.error(
        'The Pokémon data could not be loaded. Professor Oaks team will fix the problem as soon as possible.'
      );
    }
  }

  // Print Pokédex in the browser
  function addPokedexEntry(pokemon) {
    let pokedexDiv = $('#pokedex');
    let pokedexButton = $('<button></button>');
    pokedexButton.attr('type', 'button');
    pokedexButton.addClass('btn btn-danger m-2');
    pokedexButton.attr('data-bs-toggle', 'modal');
    pokedexButton.attr('data-bs-target', '#pokedexModal');
    pokedexButton.text(capitalizeFirstLetter(pokemon.name));
    pokedexDiv.append(pokedexButton);
    pokedexButton.on('click', function () {
      showLoader();
      showPokemon(pokemon);
    });
  }

  // Display the data of the Pokémon consulted in the browser
  function showPokemon(pokemon) {
    $('.modal-title').empty();
    $('.modal-body').empty();

    loadPokemonData(pokemon).then(function () {
      // Set data: Pokémon ID number + Name
      let pkmId =
        pokemon.id < 10
          ? `#00${pokemon.id} ${pokemon.name}`
          : pokemon.id >= 10 && pokemon.id < 100
          ? `#0${pokemon.id} ${pokemon.name}`
          : `#${pokemon.id} ${pokemon.name}`;
      let pkmName = $('<h1></h1>');
      pkmName.text(pkmId);

      // Set data: Pokémon Image
      let pkmImg = $('<img/>');
      pkmImg.attr('src', pokemon.imageUrl);
      pkmImg.attr('alt', 'Image of ' + pokemon.name);
      pkmImg.addClass('modal-img pokemon-img');

      // Set data: Pokémon Types
      let pkmTypes = $(`<p>${pokemon.types.join(' ')}</p>`);
      pkmTypes.addClass('text-center');
      // Set data: Pokémon Specie
      let pkmSpecie = $('<p></p>');
      pkmSpecie.addClass('bold-text text-center');
      pkmSpecie.text(pokemon.specie);
      // Set data: Pokémon Height
      let pkmHeight = $(
        `<p><span class="bold-text">Height:</span> ${pokemon.height} m</p>`
      );
      // Set data: Pokémon Weight
      let pkmWeight = $(
        `<p><span class="bold-text">Weight:</span> ${pokemon.weight} kg</p>`
      );
      // Set data: Pokémon Abilities
      let pkmAbilities = $(
        `<p><span class="bold-text">Abilities:</span> ${pokemon.abilities.join(
          ' / '
        )}</p>`
      );
      // Set data: Pokémon Description
      let pkmDescription = $(`<p><em>"${pokemon.description}"</em></p>`);

      // Display data to the user
      $('.modal-title').append(pkmName);
      $('.modal-body').append(
        pkmImg,
        pkmTypes,
        pkmSpecie,
        pkmHeight,
        pkmWeight,
        pkmAbilities,
        pkmDescription
      );
      removeLoader();
    });
  }

  // Load data of the consulted Pokémon to be displayed to the user
  async function loadPokemonData(pokemon) {
    // URL 1: https://pokeapi.co/api/v2/pokemon/[ID-Number] => ID, Name, Image, Height, Weight, Types
    let url = pokemon.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();

      // Get data: Pokémon ID
      pokemon.id = details.id;
      // Get data: Pokémon Name
      pokemon.name = capitalizeFirstLetter(details.name);
      // Get data: Pokémon Image
      pokemon.imageUrl =
        details['sprites']['other']['official-artwork']['front_default'];
      // Get data: Pokémon Height
      pokemon.height = details.height / 10;
      // Get data: Pokémon Weight
      pokemon.weight = details.weight / 10;
      // Get data: Pokémon Types
      pokemon.types = [];
      details.types.forEach(function (e) {
        pokemon.types.push(
          `<span class="${e.type.name}">${capitalizeFirstLetter(
            e.type.name
          )}</span>`
        );
      });
      // Get data: Pokémon Abilities
      pokemon.abilities = [];
      details.abilities.forEach(function (e) {
        pokemon.abilities.push(capitalizeFirstLetter(e.ability.name));
      });

      // URL 2: https://pokeapi.co/api/v2/pokemon-species/[ID-Number] => Specie, Description
      urlMoreData = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemon.id;
      try {
        const response = await fetch(urlMoreData);
        const details = await response.json();

        // Get data: Pokémon Specie ([7] = English)
        pokemon.specie = details.genera[7].genus;
        // Get data: Pokémon Description
        descriptionEng = details.flavor_text_entries.filter(
          (details) => details.language.name === 'en'
        );
        pokemon.description = descriptionEng[
          descriptionEng.length - 1
        ].flavor_text.replace(/[\n \f]/g, ' ');
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Tools
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showLoader() {
    let modalDialog = $('.modal-dialog');
    let loader = $('<div></div>');
    loader.attr('id', 'poke-loader');
    modalDialog.append(loader);
  }

  function removeLoader() {
    let loader = $('#poke-loader');
    loader.remove();
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

// Generation selector (From generation 1 to generation 8, and all generations)
function genSelector(genNumber) {
  let apiUrl;
  // Set the API URL for each generation
  switch (genNumber) {
    case 1:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';
      break;
    case 2:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100';
      break;
    case 3:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=251&limit=135';
      break;
    case 4:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107';
      break;
    case 5:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156';
      break;
    case 6:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=649&limit=72';
      break;
    case 7:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=721&limit=88';
      break;
    case 8:
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=809&limit=89';
      break;
    case 'all':
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898';
      break;
  }
  $('#pokedex').empty();
  pokedexBuilder(apiUrl);
}

// Pokédex Builder (takes as parameter the URL of the generation)
function pokedexBuilder(apiUrl) {
  pokemonRepository.loadPokedex(apiUrl).then(function () {
    pokemonRepository.getPokedex().forEach(function (pokemon) {
      pokemonRepository.addPokedexEntry(pokemon);
    });
  });
}

// Filter Pokédex by Pokémon name
function filterPokemon() {
  $(document).ready(function () {
    $('#search-pokemon').on('keyup', function () {
      var value = $(this).val().toLowerCase();
      $('#pokedex button').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
}
