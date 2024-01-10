const router = require('express').Router();

// The /recipe route
router.get('/', async (req, res) => {
    res.render('recipe');
});

module.exports = router;