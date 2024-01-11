const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('app-home');
});

router.get('/cookbook', (req,res) => {
    res.render('app-cookbook');
});

router.get('/recipe', (req,res) => {
    res.render('app-recipe');
});

router.get('/public', (req,res) => {
    res.render('app-public');
});

module.exports = router;