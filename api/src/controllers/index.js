const { postCharacter, getCharacters, getCharactersById } = require('./characterController')
const { getGenres } = require('./genreController')
const { getMovieSeries } = require('./moviseriesController')

const { loadDB } = require('./loadDB.js')

module.exports = {
	postCharacter,
    getCharacters,
    getCharactersById,
    getGenres,
    getMovieSeries,
    loadDB
}