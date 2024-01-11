const router = require('express').Router();

const appRoutes = require('./appRoutes');
const recipeRoutes = require('./recipeRoutes')

router.use('/', appRoutes);
router.use('/recipe', recipeRoutes)

module.exports = router;