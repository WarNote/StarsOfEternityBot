const { weapon, primeWeapon } = require('./weapons');
const { warframe, warframePrime } = require('./warframes');
const mods = require('./mods');

const isPrime = ({ name }) => name.includes('Prime');
const typeFunctions = new Map([
  ['Weapons', (item) => (isPrime(item) ? primeWeapon(item) : weapon(item))],
  ['Warframes', (item) => (isPrime(item) ? warframePrime(item) : warframe(item))],
  ['Mods', mods],
]);

const typeDictionary = new Map([
  [['Arch-Gun', 'Arch-Melee', 'Melee', 'Primary', 'Secondary'], 'Weapons'],
  [['Archwing', 'Warframes'], 'Warframes'],
  [['Mods'], 'Mods'],
].flatMap(([keys, value]) => keys.map((key) => [key, value])));

module.exports = (item) => {
  const type = typeDictionary.get(item.category);
  return typeFunctions.get(type)(item);
};
