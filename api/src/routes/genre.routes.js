const { Router } = require('express');
const { getGenres } = require('../controllers');

const router = Router();

router.get('/', async (req, res) => {
	try{
		return res.status(201).json(await getGenres())
		}
	catch (error){
		return res.status(404).json(error.message)
	}
})
module.exports = router;