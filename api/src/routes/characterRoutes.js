const { Router } = require('express');
const { postCharacter, getCharacters, getCharactersById } = require('../controllers');

const router = Router();

//getAll // ?query
router.get('/', async (req, res) => {
	const {name, age, movies} = req.query;
	try{
		let allCharacters = await getCharacters()
		console.log("allCharacters",allCharacters)
		if(name||age||movies) return res.status(201).json(await getCharacters(name, age, movies, allCharacters))
		return res.status(201).json(allCharacters)
		}
	catch (error){
		return res.status(404).json(error.message)
	}
})


router.get('/:id', async (req, res) => {
	let {id} = req.params
	try{
		if(id){
			return res.status(201).json(await getCharactersById(id))
		}
	} catch (error){
		return res.status(404).json(error.message)
	}
})


router.post('/', async (req,res)=> {
  
	const {name, age, weight, story, image} = req.body
	try{
		if(!name || !age){
		return res.status(402).send('Completar los campos obligatorios')
		}
		let characterCreated = await postCharacter(req.body)
		
		return res.status(202).json(characterCreated)  
	}catch (err){
		return res.status(404).json(err.message)
	}
})

module.exports = router;