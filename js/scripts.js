/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
// Pokédex IIFE

const pokemonRepository = (function pokemonRepository2() {
  let pokedex;

  // Tools
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function showLoader() {
    const modalDialog = $('.modal-dialog');
    const loader = $('<div></div>');
    loader.attr('id', 'poke-loader');
    modalDialog.append(loader);
  }

  function removeLoader() {
    const loader = $('#poke-loader');
    loader.remove();
  }

  // Add each Pokémon from the API to the Pokédex with every iteration.
  function addPokemon(pokemon) {
    if (
      typeof pokemon === 'object'
      && 'name' in pokemon
      && 'detailsUrl' in pokemon
    ) {
      pokedex.push(pokemon);
    } else {
      console.error(
        'The Pokémon data could not be loaded. Professor Oaks team will fix the problem as soon as possible.',
      );
    }
  }

  // Load Pokédex data from the API URL
  async function loadPokedex(apiUrl) {
    // Reset with each generation query the pokedex array
    pokedex = [];
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach((item) => {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        addPokemon(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Load data of the consulted Pokémon to be displayed to the user
  async function loadPokemonData(pokemon) {
    // URL 1: https://pokeapi.co/api/v2/pokemon/[ID-Number] => ID, Name, Image, Height, Weight, Types
    const url = pokemon.detailsUrl;
    try {
      let response = await fetch(url);
      let details = await response.json();

      // Get data: Pokémon ID
      pokemon.id = details.id;
      // Get data: Pokémon Name
      pokemon.name = capitalizeFirstLetter(details.name);
      // Get data: Pokémon Image
      pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
      // Get data: Pokémon Height
      pokemon.height = details.height / 10;
      // Get data: Pokémon Weight
      pokemon.weight = details.weight / 10;
      // Get data: Pokémon Types
      pokemon.types = [];
      details.types.forEach((e) => {
        pokemon.types.push(
          `<span class="${e.type.name}">${capitalizeFirstLetter(
            e.type.name,
          )}</span>`,
        );
      });
      // Get data: Pokémon Abilities
      pokemon.abilities = [];
      details.abilities.forEach((e) => {
        pokemon.abilities.push(capitalizeFirstLetter(e.ability.name));
      });

      // URL 2: https://pokeapi.co/api/v2/pokemon-species/[ID-Number] => Specie, Description
      const urlMoreData = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`;
      try {
        response = await fetch(urlMoreData);
        details = await response.json();

        // Get data: Pokémon Specie ([7] = English)
        pokemon.specie = details.genera[7].genus;
        // Get data: Pokémon Description
        const descriptionEng = details.flavor_text_entries.filter(
          () => details.language.name === 'en',
        );
        pokemon.description = descriptionEng[descriptionEng.length - 1].flavor_text.replace(/[\n \f]/g, ' ');
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Display the data of the Pokémon consulted in the browser
  function showPokemon(pokemon) {
    $('.modal-title').empty();
    $('.modal-body').empty();

    loadPokemonData(pokemon).then(() => {
      // Set data: Pokémon ID number + Name
      let pkmId;
      if (pokemon.id < 10) {
        pkmId = `#00${pokemon.id} ${pokemon.name}`;
      } else if (pokemon.id >= 10 && pokemon.id < 100) {
        pkmId = `#0${pokemon.id} ${pokemon.name}`;
      } else {
        pkmId = `#${pokemon.id} ${pokemon.name}`;
      }
      const pkmName = $('<h1></h1>');
      pkmName.text(pkmId);

      // Set data: Pokémon Image
      const pkmImg = $('<img/>');
      pkmImg.attr('src', pokemon.imageUrl);
      pkmImg.attr('alt', `Image of ${pokemon.name}`);
      pkmImg.addClass('modal-img pokemon-img');

      // Set data: Pokémon Types
      const pkmTypes = $(`<p>${pokemon.types.join(' ')}</p>`);
      pkmTypes.addClass('text-center');
      // Set data: Pokémon Specie
      const pkmSpecie = $('<p></p>');
      pkmSpecie.addClass('bold-text text-center');
      pkmSpecie.text(pokemon.specie);
      // Set data: Pokémon Height
      const pkmHeight = $(
        `<p><span class="bold-text">Height:</span> ${pokemon.height} m</p>`,
      );
      // Set data: Pokémon Weight
      const pkmWeight = $(
        `<p><span class="bold-text">Weight:</span> ${pokemon.weight} kg</p>`,
      );
      // Set data: Pokémon Abilities
      const pkmAbilities = $(
        `<p><span class="bold-text">Abilities:</span> ${pokemon.abilities.join(
          ' / ',
        )}</p>`,
      );
      // Set data: Pokémon Description
      const pkmDescription = $(`<p><em>"${pokemon.description}"</em></p>`);

      // Display data to the user
      $('.modal-title').append(pkmName);
      $('.modal-body').append(
        pkmImg,
        pkmTypes,
        pkmSpecie,
        pkmHeight,
        pkmWeight,
        pkmAbilities,
        pkmDescription,
      );
      removeLoader();
    });
  }

  // Print Pokédex in the browser
  function addPokedexEntry(pokemon) {
    const pokedexDiv = $('#pokedex');
    const pokedexButton = $('<button></button>');
    pokedexButton.attr('type', 'button');
    pokedexButton.addClass('btn btn-danger m-2');
    pokedexButton.attr('data-bs-toggle', 'modal');
    pokedexButton.attr('data-bs-target', '#pokedexModal');
    pokedexButton.text(capitalizeFirstLetter(pokemon.name));
    pokedexDiv.append(pokedexButton);
    pokedexButton.on('click', () => {
      showLoader();
      showPokemon(pokemon);
    });
  }

  // Return the Pokédex array outside the IIFE
  function getPokedex() {
    return pokedex;
  }

  // Return
  return {
    loadPokedex,
    addPokemon,
    getPokedex,
    addPokedexEntry,
    showPokemon,
    loadPokemonData,
  };
}());

// Pokédex Builder (takes as parameter the URL of the generation)
function pokedexBuilder(apiUrl) {
  pokemonRepository.loadPokedex(apiUrl).then(() => {
    pokemonRepository.getPokedex().forEach((pokemon) => {
      pokemonRepository.addPokedexEntry(pokemon);
    });
  });
}

// Generation selector (From generation 1 to generation 8, and all generations)
// eslint-disable-next-line no-unused-vars
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
    default:
      break;
  }
  $('#pokedex').empty();
  pokedexBuilder(apiUrl);
}

// Filter Pokédex by Pokémon name
// eslint-disable-next-line no-unused-vars
function filterPokemon() {
  $(document).ready(() => {
    $('#search-pokemon').on('keyup', function searchPokemon() {
      const value = $(this).val().toLowerCase();
      $('#pokedex button').filter(function filterButtons() {
        return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  });
}
