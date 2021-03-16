let pokemonRepository = (function () {
  let pokemonList = [];
  pokemonList = [
    {
      name: 'Bulbasaur',
      types: ['Grass', 'Poison'],
      height: 0.7,
      weight: 6.9,
      gender: ['Male', 'Female'],
      category: 'Seed',
      evolutions: ['Ivysaur'],
      description:
        'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
    },
    {
      name: 'Ivysaur',
      types: ['Grass', 'Poison'],
      height: 1,
      weight: 13,
      gender: ['Male', 'Female'],
      category: 'Seed',
      evolutions: ['Venusaur'],
      description:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
    },
    {
      name: 'Venusaur',
      types: ['Grass', 'Poison'],
      height: 2,
      weight: 100,
      gender: ['Male', 'Female'],
      category: 'Seed',
      evolutions: ['None'],
      description:
        'Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
    },
    {
      name: 'Charmander',
      types: ['Fire', 'None'],
      height: 0.6,
      weight: 8.5,
      gender: ['Male', 'Female'],
      category: 'Lizard',
      evolutions: ['Charmeleon'],
      description:
        'It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.',
    },
    {
      name: 'Charmeleon',
      types: ['Fire', 'None'],
      height: 1.1,
      weight: 19,
      gender: ['Male', 'Female'],
      category: 'Flame',
      evolutions: ['Charizard'],
      description:
        'It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.',
    },
    {
      name: 'Charizard',
      types: ['Fire', 'Flying'],
      height: 1.7,
      weight: 90.5,
      gender: ['Male', 'Female'],
      category: 'Flame',
      evolutions: ['None'],
      description:
        'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.',
    },
    {
      name: 'Squirtle',
      types: ['Water', 'None'],
      height: 0.5,
      weight: 9,
      gender: ['Male', 'Female'],
      category: 'Tiny Turtle',
      evolutions: ['Wartortle'],
      description:
        'When it retracts its long neck into its shell, it squirts out water with vigorous force.',
    },
    {
      name: 'Wartortle',
      types: ['Water', 'None'],
      height: 1,
      weight: 22.5,
      gender: ['Male', 'Female'],
      category: 'Turtle',
      evolutions: ['Blastoise'],
      description:
        'It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.',
    },
    {
      name: 'Blastoise',
      types: ['Water', 'None'],
      height: 1.6,
      weight: 85.5,
      gender: ['Male', 'Female'],
      category: 'Shellfish',
      evolutions: ['None'],
      description:
        'It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.',
    },
  ];

  function getAll() {
    return pokemonList;
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

  // Listen Button Pokédex
  function pokedexListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Shows information about the consulted Pokémon (Console)
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // Minimum keys required to add a new Pokémon to the Pokédex
  let keyRequired = {
    name: '',
    types: ['', ''],
    evolutions: '',
    description: '',
  };

  // Compare the keys of the new object with the minimum required keys
  function checkKeys(item) {
    let checkEvaluation = Object.keys(keyRequired).every((key) => key in item);
    //Returns true or false
    return checkEvaluation;
  }

  // Add a new Pokémon
  function add(item) {
    if (typeof item === 'object') {
      console.log(
        `Object "${item.name}" has the required keys? (name, types, evolutions, description): ` +
          checkKeys(item)
      );
      console.log(Object.keys(item));
      console.log(Object.keys(keyRequired));
      if (checkKeys(item)) {
        console.log(
          `You have discovered a new Pokémon! "${item.name}" data has been entered into the Pokédex.`
        );
        pokemonList.push(item);
      } else {
        console.log(
          `The data of the new Pokémon ("${item.name}") you are trying to add does not have the minimum required fields to be entered into the Pokédex. Please check that it has at least the following minimum required fields: name, types, evolutions and description.`
        );
      }
    } else {
      // Information is provided about what type of data the entry is.
      console.log(
        `"${item}" is not a valid Pokémon! Is a ${typeof item}. Please check that the data type typed in is an object with at least the following minimum required fields: name, types, evolutions and description.`
      );
    }
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
    getAll: getAll,
    addListItem: addListItem,
    add: add,
    remove: remove,
  };
})();

// Displays the Pokédex on the website
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
