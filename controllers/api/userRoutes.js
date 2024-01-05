const router = require('express').Router();
const { User , Cookbook } = require('../../models');


router.get('/signup', async (req,res) => {
    console.log(req.method + " request for " + req.path);
    res.json({message:"signup request heard"});
}); 

router.post('/signup', async (req,res) => {
    console.log("Post request heard")
    // console.log(req.body);
    try {
        // Create user in db
        console.log("Creating user");
        const userData = await User.create(req.body);
        // console.log(userData);


        // req.session.user_id = userData.id;
        // Create default private cookbook
        console.log("Creating cookbook");
        const cookBookData = await Cookbook.create(
            {
                creator_id: userData.id,
                title: "My Cookbook",
                isPublic: false,
                description: "This is my default cookbook!",
                viewers: null,
                editors: null,
                recipes: null,
            }
        );
        console.log(cookBookData);

        //TODO - Send verification email
        
        // TODO - Redirect to login
        res.json({
            message: "Success!"
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;