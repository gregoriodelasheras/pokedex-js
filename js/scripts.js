// pokedex Array
let pokedex = [];

// Add objects to the pokedex Array
pokedex = [
  {
    // Bulbasaur
    // Pokémon Name
    name: 'Bulbasaur',
    // Pokémon Type: Primary Type, Secondary Type
    types: ['Grass', 'Poison'],
    // Pokémon Height
    height: 0.7,
    // Pokémon Weight
    weight: 6.9,
    // Pokémon Gender: Male, Female, Unknown
    gender: ['Male', 'Female'],
    // Pokémon Category
    category: 'Seed',
    // Pokémon Evolutions: Evolution 1, Alternative Evolution 2, Alternative Evolution 3, etc
    evolutions: ['Ivysaur'],
    // Pokémon Description
    description:
      'There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.',
  },
  // Ivysaur
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
  // Venusaur
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
  // Charmander
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
  // Charmeleon
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
  // Charizard
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
  // Squirtle
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
  // Wartortle
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
  // Blastoise
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

// Function sizePokemon: compare sizes between pokemon
function printPokedex() {
  for (let i = 0; i < pokedex.length; i++) {
    // if-conditional to indicate the number of the Pokémon in the Pokédex
    // If it is less than 10, print before number "00"
    if (i < 9) {
      document.getElementById(
        'show-pokedex'
      ).innerHTML += `<strong>Number:</strong> 00${1 + i}<br />`;
      // If it is greater than or equal to 10 and less than 100, print before number "0"
    } else if (i >= 9 && i < 99) {
      document.getElementById(
        'show-pokedex'
      ).innerHTML += `<strong>Number:</strong> 0${1 + i}<br />`;
      // If it is less than 100, print only the number
    } else {
      document.getElementById(
        'show-pokedex'
      ).innerHTML += `<strong>Number:</strong> ${1 + i}<br />`;
    }
    // Print the name of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Name:</strong> ${pokedex[i].name}<br />`;
    // Print the types of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Type 1:</strong> ${pokedex[i].types[0]} | <strong>Type 2:</strong> ${pokedex[i].types[1]}<br />`;
    // Print the height of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Height:</strong> ${pokedex[i].height} m <br />`;
    // Print the weight of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Weight:</strong> ${pokedex[i].weight} kg <br />`;
    // Print the possible genders of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Genders:</strong> ${pokedex[i].gender[0]} / ${pokedex[i].gender[1]} <br />`;
    // Print the category of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Category:</strong> ${pokedex[i].category} <br />`;
    // Print the possible evolutions of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Evolutions:</strong> ${pokedex[i].evolutions[0]} <br />`;
    // Print the description of the Pokémon
    document.getElementById(
      'show-pokedex'
    ).innerHTML += `<strong>Description:</strong> ${pokedex[i].description} <br />`;
    // if-conditional to measure the size of the Pokémon
    // If it is greater than 1.6 m
    if (pokedex[i].height > 1.6) {
      document.getElementById('show-pokedex').innerHTML +=
        '<strong>Wow, it’s a big Pokémon!</strong><br />';
      // If it is between 1 m and 1.6 m
    } else if (pokedex[i].height > 1 && pokedex[i].height < 1.6) {
      document.getElementById('show-pokedex').innerHTML +=
        '<strong>It’s an average Pokémon.</strong><br />';
      // If it is less than 1 m
    } else {
      document.getElementById('show-pokedex').innerHTML +=
        '<strong>It’s a tiny Pokémon!</strong><br />';
    }
    // Add a line break to separate each Pokémon
    document.getElementById('show-pokedex').innerHTML += '<br />';
  }
}
// Run printPokedex function
printPokedex();
