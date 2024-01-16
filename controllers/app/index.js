const router = require('express').Router();

const appRoutes = require('./appRoutes');
const recipeRoutes = require('./recipeRoutes')
const cookbookRoutes = require('./cookbookRoutes')

router.use('/', appRoutes);
router.use('/recipe', recipeRoutes)
router.use('/cookbook', cookbookRoutes)

module.exports = router;