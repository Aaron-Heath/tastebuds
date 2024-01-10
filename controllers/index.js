const router = require('express').Router();

const testRoutes = require('./test-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const recipeRoutes = require('./recipeRoutes')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/test', testRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;