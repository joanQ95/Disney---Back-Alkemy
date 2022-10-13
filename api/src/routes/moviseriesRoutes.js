const { Router } = require('express');
const { getMovieSeries } = require('../controllers');

const router = Router();
router.get('/', async (req, res) => {
	try{
		return res.status(201).json(await getMovieSeries())
		}
	catch (error){
		return res.status(404).json(error.message)
	}
})
router.post('/', async (req, res) => {
	const {title, image, creationAge, rated, characters} = req.body
	try{
		if(!title){
		return res.status(402).send('Completar los campos obligatorios')
		}
		let characterCreated = await postCharacter(req.body)
		
		return res.status(202).json(characterCreated)  
	}catch (err){
		return res.status(404).json(err.message)
	}
})


module.exports = router;