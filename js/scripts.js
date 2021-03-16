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

  // Minimum keys required to add a new Pokémon to the Pokédex
  let keyRequired = {
    name: '',
    types: ['', ''],
    evolutions: '',
    description: '',
  };

  function checkKeys(item) {
    let checkEvaluation = Object.keys(keyRequired).every((key) => key in item);
    return checkEvaluation;
  }

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === 'object') {
      console.log(
        `Object "${item.name}" has the required keys? (name, types, evolutions, description): ` +
          // If the '.every' method is changed to the '.some' method, it will be positive because there is at least one key required in all the entered objects ("name").
          checkKeys(item)
      );
      console.log(Object.keys(item));
      console.log(Object.keys(keyRequired));
      // If the '.every' method is changed to the '.some' method, it will be positive because there is at least one key required in all the entered objects ("name").
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

  function remove() {
    console.log(
      `The last Pokémon ("${
        pokemonList[pokemonList.length - 1].name
      }") has been deleted`
    );
    pokemonList.pop();
  }

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

pokemonRepository.add({
  name: 'PanchoDev',
  types: ['Rock', 'Roll'],
  height: 1.5,
  weight: 200,
  gender: ['Male', 'IT Guru'],
  category: 'Full-Stack Web Dev',
  evolutions: ['None'],
  description:
    'Following the wise advice of his tutor Itua and mentor Vinh Tuong, he has managed to achieve mastery of web programming.',
});

pokemonRepository.add({
  name: 'Invalidmon',
  noTypes: ['Bla', 'Bla'],
  noHeight: 1,
  noWeight: 800,
  noGender: ['Bla1', 'Bla2'],
  noCategory: 'Bla',
  noEvolutions: ['BlaBla'],
});

pokemonRepository.add('Digimon');

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
