const router = require('express').Router();

const testRoutes = require('./test-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cookbookRoutes = require ('./cookbookRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/test', testRoutes);
router.use('/cookbookRoutes', cookbookRoutes);

module.exports = router;