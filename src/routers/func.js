const fetch = require('node-fetch');

const getPokemons = async () => {
  const result = await fetch('https://pokeapi.co/api/v2/ability/drizzle').then(
    (data) => data.json(),
  );
};

getPokemons();

module.exports = { getPokemons };

// {
//   effect: 'Das weather ändert sich zu rain wenn ein Pokémon mit dieser Fähigkeit den Kampf betritt. Dieser Effekt ist dauerhaft bis das weather geändert wird.\n' +
//     '\n' +
//     'Wenn mehrere Pokémon mit dieser Fähigkeit, drought, sand stream oder snow warning zur selben Zeit den Kampf betreten, werden die Fähigkeiten nach Reihenfolge der speed der Pokémon ausgelöst, unter Berücksichtigung von trick room.',
//   language: [Object],
//   short_effect: 'Ändert beim Betreten des Kampfes das weather in rain.'
// },
