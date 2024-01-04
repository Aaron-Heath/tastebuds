const router = require('express').Router();

const testRoutes = require('./test-routes');

router.use('/test', testRoutes);

module.exports = router;