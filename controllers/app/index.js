const router = require('express').Router();

const appRoutes = require('./appRoutes');

router.use('/', appRoutes);

module.exports = router;