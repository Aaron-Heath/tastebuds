const router = require('express').Router();
const { Cookbook, User, Recipe, UserCookbook } = require('../../models');
const withAuth = require('../../utils/auth');
router.all('*',withAuth);

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
});

router.get('/:cookbook_id', async (req, res) => {
    try {
        // Get user ID from the session
        const userId = req.session.user.id;

        if(!req.params.shared) {
            // TODO: Query shared cookin bookins
        }

        // Retrieve the specified cookbook for the logged-in user
        let cookbookData = await Cookbook.findOne({
            where: {
                id: req.params.cookbook_id,
                creator_id: userId
            },
            include: {
                model: Recipe,
                include: {
                    model: User
                }
            }

            // include: User
        });

        console.log(cookbookData)

        // Check if the cookbook exists
        if (!cookbookData) {
            return res.status(404).render('404', { logged_in: req.session.logged_in });
        }

        // Get the cookbook as a plain object
        const cookbook = cookbookData.get({ plain: true });
        console.log(cookbook);

        // Render the page with the cookbook, user ID, and logged-in status
        res.render('app-cookbook', { ...cookbook, user_id: userId, logged_in: req.session.logged_in });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

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

        const dbUserCookbookData = await UserCookbook.findAll({
            where:{
                cookbook_id: req.params.id
            }
        });
        const userCookbooks = await dbUserCookbookData.map((userCookbook) => 
        ({ plain: true })
        );
        console.log(userCookbook)

        // Gets current user ID for later use
        const creator_id = req.session.user.id;

        res.render('app-cookbook-update', { 
            cookbook, 
            users,
            userCookbooks, 
            creator_id: creator_id,
            logged_in: req.session.logged_in  });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;