const router = require('express').Router();

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const cookbookRoutes = require ('./cookbookRoutes');
const shareRoutes = require('./shareRoutes');

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/cookbook', cookbookRoutes);
router.use('/share', shareRoutes);

module.exports = router;