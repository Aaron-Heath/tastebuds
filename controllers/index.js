const router = require('express').Router();

const testRoutes = require('./test-routes');
const userRoutes = require('./api/userRoutes');

router.use('/user', userRoutes);
router.use('/test', testRoutes);

module.exports = router;