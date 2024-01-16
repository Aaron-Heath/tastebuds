const router = require('express').Router();

router.get('/', async (req,res) => {
    if(req.session.logged_in) {
        res.redirect('/app');
    }

    res.render('homepage', { logged_in: req.session.logged_in });
})

router.get('/signup', async (req, res) => {
    
    res.render('signup', { logged_in: req.session.logged_in });
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