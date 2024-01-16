const router = require('express').Router();

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const cookbookRoutes = require ('./cookbookRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/cookbook', cookbookRoutes);

module.exports = router;