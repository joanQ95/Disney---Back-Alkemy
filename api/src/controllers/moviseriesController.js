'use strict'
require('dotenv').config();
const { Character, Genre, Movieserie } = require('../db');

async function getMovieSeries( queryParameterName, queryParameterGenre, queryParameterOrder, allMovies ){
    let movieSerieDB = await Movieserie.findAll({
        include:[
            {
                model: Character,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through:{ 
                    attributes: [], 
                },
            },
            {
                model: Genre,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through:{ 
                    attributes: [], 
                },
            }
            
        ]
    })
    if (!allMovies) {
        console.log("AQUI NO DEBERIA ENTRAR")
        return movieSerieDB;
    }
    let jsonFiltered = allMovies;
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", jsonFiltered);
    if(queryParameterGenre&&queryParameterOrder){
        jsonFiltered = await Movieserie.findAll({
            include:[
                {
                    model: Character,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through:{ 
                        attributes: [], 
                    },
                },
                {
                    model: Genre,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    through:{ 
                        attributes: [], 
                    },
                    where: { name: queryParameterGenre }
                }
            ]
            ,order: [['title', queryParameterOrder]]
        });
    }else{
        if (queryParameterGenre) {
            jsonFiltered = await Movieserie.findAll({
                include:[
                    {
                        model: Character,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        through:{ 
                            attributes: [], 
                        },
                    },
                    {
                        model: Genre,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        through:{ 
                            attributes: [], 
                        },
                        where: { name: queryParameterGenre }
                    }
                ]
            });
        }
        if (queryParameterOrder) {
            jsonFiltered = await Movieserie.findAll({
                include:[
                    {
                        model: Character,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        through:{ 
                            attributes: [], 
                        },
                    },
                    {
                        model: Genre,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        through:{ 
                            attributes: [], 
                        },
                    }
                    
                ]
                ,order: [['title', queryParameterOrder]]
            });
        }
    }
    
    if (queryParameterName) {
        // jsonFiltered = jsonFiltered.filter(e=>(e.name.toLowerCase().indexOf(queryParameterName.toLowerCase()))!=-1)
        jsonFiltered = jsonFiltered.filter(
          (e) => e.title.toLowerCase() == queryParameterName
        );
    }
    console.log("que paso", jsonFiltered);
    return jsonFiltered
}

async function postMovieSeries(body){
    const {title, image, creationAge, rated, characters, genre} = body
    if(!characters.length>0) throw new Error('Debe ingresar dietas')
    let movieDbName = await Movieserie.findAll({ 
        where: { title } 
    })
    if(movieDbName.length) throw new Error('El titutlo ya existe, ingresar otro')
    const newMovie = await Movieserie.create({
		title,
		image,
		creationAge,
		rated 
	})
    console.log(newMovie)

    let nameCharacter = characters.map(e=> e.name)
    await Character.bulkCreate(characters, {ignoreDuplicates: true})
    let characterDb = await Character.findAll({
        where: { name: nameCharacter }
    })
    newMovie.addCharacter(characterDb)

    let nameGenre = genre.map(e=> e.name)
    await Genre.bulkCreate(genre, {ignoreDuplicates: true})
    let genreDb = await Genre.findAll({
        where: { name: nameGenre }
    })
    newMovie.addGenre(genreDb)

    return 'Movie/Serie created succesfully'
}

module.exports = {
	getMovieSeries,
    postMovieSeries
}