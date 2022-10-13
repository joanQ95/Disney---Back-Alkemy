const { characterData, genres } = require('./data')
const { Character, Genre } = require('../db');

async function loadDB(){
	
	await Character.bulkCreate(characterData.characters, {ignoreDuplicates: true})
	await Genre.bulkCreate(genres, {ignoreDuplicates: true})
}
module.exports = {
  loadDB
}