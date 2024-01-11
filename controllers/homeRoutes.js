const router = require('express').Router();

router.get('/', async (req,res) => {
    res.render('homepage');
})

router.get('/signup', async (req, res) => {
    
    res.render('signup');
});

router.get('/login', async (req,res) => {

    // If already logged in
    // Redirect to application main page
    if(req.session.logged_in) {
        res.redirect('/app');
    }

    // else serve login page
    res.render('login');
});

module.exports = router;