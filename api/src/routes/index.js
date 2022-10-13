const { Router } = require('express');
const characterRouter = require('./characterRoutes'); //agregué
const genreRouter = require('./genreRoutes');//agregué
const moviseriesRouter = require('./moviseriesRoutes');
const router = Router();


router.use('/characters', characterRouter);
router.use('/genres', genreRouter);
router.use('/movies', moviseriesRouter);

module.exports = router;
