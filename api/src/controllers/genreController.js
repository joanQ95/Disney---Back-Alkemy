'use strict'
require('dotenv').config();
const { Character, Genre, Movieserie } = require('../db');

async function getGenres(){
    let genresDB = await Genre.findAll({
        include:{
            model: Movieserie,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            through:{ 
                attributes: [], 
            },
        }
    })
    return genresDB;
}

module.exports = {
	getGenres
}