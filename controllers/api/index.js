const router = require('express').Router();

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const cookbookRoutes = require ('./cookbookRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/cookbookRoutes', cookbookRoutes);

module.exports = router;