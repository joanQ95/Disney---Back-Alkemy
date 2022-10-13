'use strict'
require('dotenv').config();
const { Character, Genre, Movieserie } = require('../db');

async function getGenres(){
    let genresDB = await Genre.findAll({})
    return genresDB;
}

module.exports = {
	getGenres
}