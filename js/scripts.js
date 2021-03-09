// Const Variables
const nameTutor = 'Itua';

// Let Variables
let welcomeMessage = 'Hello world';
let favoritePokemon = 'Cubone';
let numberPokemon;

// Displays message #1 to the user
alert(welcomeMessage);

// Displays message #2 to the user
document.write(
  `<h1>Hi ${nameTutor}!</h1><p>My favorite Pokémon is <strong>${favoritePokemon}</strong>!</p>`
);

// Assigns value to the 'numberPokemon' variable
numberPokemon = 100;

// Displays message #3 to the user
document.write(
  `<p><strong>${favoritePokemon}</strong> is the #${(numberPokemon += 4)} Pokémon.</p>`
);

// Displays message #4 to the user
document.write(
  `<p class="question">Do you have a favorite Pokémon, ${nameTutor}?</p>`
);
