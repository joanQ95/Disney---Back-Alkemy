const { Router } = require('express');
const characterRouter = require('./character.routes'); //agregué
const genreRouter = require('./genre.routes');//agregué
const moviseriesRouter = require('./moviseries.routes');
const router = Router();


router.use('/characters', characterRouter);
router.use('/genres', genreRouter);
router.use('/movies', moviseriesRouter);

module.exports = router;
