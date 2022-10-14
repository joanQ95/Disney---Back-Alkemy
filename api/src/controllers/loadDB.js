const { characterData, genres } = require('./data')
const { Character, Genre } = require('../db');

async function postJsonMovieSeries(body){
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

async function loadDB(){
	
	await Character.bulkCreate(characterData.characters, {ignoreDuplicates: true})
	await Genre.bulkCreate(genres, {ignoreDuplicates: true})
}
module.exports = {
  loadDB
}