'use strict'
require('dotenv').config();
const { Character, Genre, Movieserie } = require('../db');

async function getMovieSeries(){
    let movieSerieDB = await Movieserie.findAll({})
    return movieSerieDB;
}

module.exports = {
	getMovieSeries
}