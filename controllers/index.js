const router = require('express').Router();

const testRoutes = require('./test-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const appRoutes = require('./app');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/app', appRoutes);

module.exports = router;