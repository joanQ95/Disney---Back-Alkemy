"use strict";
require("dotenv").config();
const { Character, Genre, Movieserie } = require("../db");

async function postCharacter(body) {
  const { name, age, weight, story, image } = body;
  let characterDbName = await Character.findAll({
    where: { name },
  });
  if (characterDbName.length)
    throw new Error("El nombre ya existe, ingresar otro");
  const newCharacter = await Character.create({
    name,
    age,
    weight,
    story,
    image,
  });
  console.log(newCharacter);
  return "Character created succesfully";
}

async function getCharacters( queryParameterName, queryParameterAge, queryParameterMovies, allCharacters ) {
  let charactersDB = await Character.findAll({
    include: {
      model: Movieserie,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      through: {
        attributes: [],
      },
    },
  });
  if (!allCharacters) {
    return charactersDB;
  }
  let jsonFiltered = allCharacters;
  if (queryParameterName) {
    // jsonFiltered = jsonFiltered.filter(e=>(e.name.toLowerCase().indexOf(queryParameterName.toLowerCase()))!=-1)
    jsonFiltered = jsonFiltered.filter(
      (e) => e.name.toLowerCase() == queryParameterName
    );
  }
  if (queryParameterAge) {
    console.log("jsonFiltered", jsonFiltered);
    jsonFiltered = jsonFiltered.filter((e) => e.age == queryParameterAge);
  }
  if (queryParameterMovies) {
    jsonFiltered = jsonFiltered.filter(
      (e) =>
        e.movies.toLowerCase().indexOf(queryParameterAge.toLowerCase()) != -1
    );
  }
  console.log("que paso", jsonFiltered);
  return jsonFiltered;
}

async function getCharactersById(idCharacter) {
  console.log(idCharacter);
  const recipeFinded = await Character.findByPk(idCharacter, {
    include: {
      model: Movieserie,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      through: {
        attributes: [],
      },
    },
  });
  if (!recipeFinded) {
    throw new Error("Invalid id");
  }
  console.log(recipeFinded);
  return recipeFinded;
}

async function updateCharacter(id, name, age, weight, story, image) {
  console.log(id);
  let errores = [];
	let searchId = await Character.findAll({ where: { id } });
	if (!searchId.length) {
		return "Invalid ID";
	}
	if(!name && !age && !weight && !story && !image) {
		return "No fields to update";	
	}
  if (name) {
    if (!/^[a-zA-Z0-9\s_\-\.\'\!\&\@\$]+$/.test(name)) {
      errores.push("name");
    } else {
			console.log("no los entiendos")
      await Character.update({ name }, { where: { id } });
    }
  }
  if (age) {
    if (!/^[0-9]+$/.test(age)) {
      errores.push("age");
    } else {
      await Character.update({ age }, { where: { id } });
    }
  }
  if (weight) {
    if (!/^[+-]?([0-9]*[.])?[0-9]+$/.test(weight)) {
      errores.push("weight");
    } else {
      await Character.update( { weight }, { where: { id } });
    }
  }
  if (story) {
    if (!/^[a-zA-Z0-9\s_\-\.\'\!\&\@\$]+$/.test(story)) {
      errores.push("story");
    } else {
      await Character.update( { story }, { where: { id } });
    }
  }
  if (image) {
    if (!/^[a-zA-Z0-9\s_\-\.\'\!\&\@\/\:\$]+$/.test(image)) {
      errores.push("image");
    } else {
      await Character.update( { image }, { where: { id } });
    }
  }
  if (errores.length > 0) {
    const error = errores.join(", ");
    return `The following fields weren't updated: ${error}.`;
  }
  return `Fields updated successfully.`;
}

async function deleteCharacter(id) {
    console.log(id);
    let searchId = await Character.findAll({ where: { id } });
	  if (searchId.length > 0) {
		await Character.destroy({ where: { id } });
	  }else{
			throw new Error("Invalid id");
		}
	  return "Successfully deleted";
  }
   

module.exports = {
  postCharacter,
  getCharacters,
  getCharactersById,
  updateCharacter,
  deleteCharacter
};
