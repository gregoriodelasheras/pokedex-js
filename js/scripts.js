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

  // Bonus Task 1 and 2
  function add(item) {
    if (typeof item === 'object') {
      console.log(
        'Object has all the keys? - ' +
          Object.keys(pokemonList[0]).every((key) => key in item)
      );
      if (Object.keys(pokemonList[0]).every((key) => key in item)) {
        alert(
          `You have discovered a new Pokémon! "${item.name}" data has been entered into the Pokédex.`
        );
        pokemonList.push(item);
      } else {
        alert(
          `The data for the new Pokémon you are trying to add is not complete. Please verify that no fields are missing.`
        );
      }
    } else {
      alert(
        `"${item}" is not a valid Pokémon! Please check that the data type typed in is an object.`
      );
    }
  }

  function remove(item) {
    pokemonList.pop(item);
    alert('The last Pokémon has been deleted');
  }

  // Bonus Task 3: find specific Pokémon only by name
  let button = document.getElementById('filter');
  button.onclick = function () {
    let filterPkm = pokemonRepository.getAll().filter(function (pkm) {
      return pkm.name === document.getElementById('searchPkm').value;
    });
    console.log(filterPkm);
  };

  return {
    getAll: getAll,
    add: add,
    remove: remove,
  };
})();

// Bonus Task 1 & 2: Add a valid object 1
pokemonRepository.add({
  name: 'Panchomon',
  types: ['Rock', 'Roll'],
  height: 1.7,
  weight: 80,
  gender: ['Male', 'Latin Lover'],
  category: 'WebDev?',
  evolutions: ['PanchoDev'],
  description:
    'He studies and programs a lot in order to become a good web developer.',
});

// Bonus Task 1 & 2: Add a valid object 2 (to remove)
pokemonRepository.add({
  name: 'PanchoDev',
  types: ['Rock', 'Roll'],
  height: 1.65,
  weight: 200,
  gender: ['Male', 'Super Macho'],
  category: 'WebDev',
  evolutions: ['None'],
  description:
    'Following the wise advice of his tutor Itua and mentor Vinh Tuong, he has managed to achieve mastery of web programming.',
});

// Bonus Task 1 & 2: Add a invalid object 1 (missing data)
pokemonRepository.add({
  name: 'Bla',
  types: ['Bla', 'Bla'],
  height: 1,
  weight: 800,
  gender: ['Bla1', 'Bla2'],
  category: 'Bla',
  evolutions: ['BlaBla'],
});

// Bonus Task 1 & 2: Add an invalid object 2
pokemonRepository.add('Digimon');

// Bonus Task: Remove last valid object
pokemonRepository.remove();

// Print Pokédex
function printPokedex(pkm) {
  let sizePkm =
    pkm.height > 1.6
      ? 'Wow, it’s a big Pokémon!'
      : pkm.height > 1 && pkm.height < 1.6
      ? 'It’s an average Pokémon.'
      : 'It’s a tiny Pokémon!';

  // Print Pokédex
  document.getElementById('show-pokedex').innerHTML += `
    <div class="pokecard">
      <p><strong>Name:        </strong>${pkm.name}           </p>
      <p><strong>Type 1:      </strong>${pkm.types[0]}       | <strong>Type 2:</strong> ${pkm.types[1]}</p>
      <p><strong>Height:      </strong>${pkm.height}         m</p>
      <p><strong>Weight:      </strong>${pkm.weight}         kg</p>
      <p><strong>Genders:     </strong>${pkm.gender[0]}      / ${pkm.gender[1]}</p>
      <p><strong>Category:    </strong>${pkm.category}       </p>
      <p><strong>Evolutions:  </strong>${pkm.evolutions[0]}  </p>
      <p><strong>Description: </strong>${pkm.description}    </p>
      <p><strong>${sizePkm}</p>
    </div>`;
}

pokemonRepository.getAll().forEach(printPokedex);
