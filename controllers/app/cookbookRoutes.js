const router = require('express').Router();
const { Cookbook, User } = require('../../models');

// TODO: require login
// The /app/cookbook endpoint for getting the form to create a new cookbook
router.get('/', async (req, res) => {
    try {
        // Gets current user ID for later use
        const creator_id = req.session.user.id;
        
        res.render('app-cookbook-create', {creator_id: creator_id});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

// The /app/cookbook/update/:id endpoint for getting the form to update a cookbook
router.get('/update/:id', async (req, res) => {
    try {
        const dbCookbookData = await Cookbook.findByPk(req.params.id);

        const cookbook = dbCookbookData.get({ plain: true });
        console.log(cookbook);
        
        const dbUserData = await User.findAll();
        const users = dbUserData.map((user) => 
        user.get({plain: true}));
        console.log(users)

        res.render('app-cookbook-update', { cookbook, users });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;