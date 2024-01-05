const router = require('express').Router();
const { User,CookBook } = require('../../models/User');


router.get('/signup', async (req,res) => {
    console.log(req.method + "request for " + req.path);
    res.json({message:"signup request heard"});
}); 

router.post('/signup', async (req,res) => {
    try {
        // Create user in db
        const userData = await User.create(req.body);
        req.session.user_id = userData.id;

        // Create default private cookbook
        const cookBookData = await CookBook.create(
            {
                creator_id: userData.id,
                title: "My Cookbook",
                isPublic: false,
                desciption: "This is my default cookbook!",
                viewers: null,
                editors: null,
                recipes: null,
            }
        );

        //TODO - Send verification email
        
        // Redirect to login
        res.redirect('/login');

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;