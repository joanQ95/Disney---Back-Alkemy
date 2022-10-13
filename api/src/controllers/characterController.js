'use strict'
require('dotenv').config();
const { Character, Genre, Movieserie } = require('../db');

async function postCharacter(body){
    const {name, age, weight, story, image} = body
    let characterDbName = await Character.findAll({ 
        where: { name } 
    })
    if(characterDbName.length) throw new Error('El nombre ya existe, ingresar otro')
    const newCharacter = await Character.create({
		name,
		age,
		weight,
		story,
		image,
	})
    console.log(newCharacter)
    return 'Character created succesfully'
}

async function getCharacters(){
    let charactersDB = await Character.findAll({})
    return charactersDB;
}

async function getCharacters(queryParameterName, queryParameterAge, queryParameterMovies, allCharacters){
    let charactersDB = await Character.findAll({})
    console.log("he entrado",{queryParameterName, queryParameterAge, queryParameterMovies, allCharacters})
    console.log(allCharacters)
    if(!allCharacters){
        return charactersDB;
    }
    let jsonFiltered = allCharacters
    if(queryParameterName){
        // jsonFiltered = jsonFiltered.filter(e=>(e.name.toLowerCase().indexOf(queryParameterName.toLowerCase()))!=-1)
        jsonFiltered = jsonFiltered.filter(e=>(e.name.toLowerCase()==queryParameterName))
    }
    if(queryParameterAge){
        console.log("jsonFiltered",jsonFiltered)
        jsonFiltered = jsonFiltered.filter(e=>(e.age==queryParameterAge))
    }
    if(queryParameterMovies){
        jsonFiltered = jsonFiltered.filter(e=>(e.movies.toLowerCase().indexOf(queryParameterAge.toLowerCase()))!=-1)
    }
    console.log("que paso", jsonFiltered)
    return jsonFiltered;
}

async function getCharactersById(idCharacter){
    console.log(idCharacter)
    const recipeFinded = await Character.findByPk(idCharacter,{
        // include:{
        //     model: Character,
        //     attributes: ['name'],
        //     through:{ 
        //         attributes: [], 
        //     },
        // }
    })
    if (!recipeFinded) {
        throw new Error("Invalid id letra")          
    }  
    console.log(recipeFinded)
    return recipeFinded;    
}

module.exports = {
	postCharacter, 
    getCharacters,
    getCharactersById
}