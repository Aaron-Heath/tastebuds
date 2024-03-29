const router = require('express').Router();
const { Cookbook, User, Recipe, UserCookbook } = require('../../models');
const withAuth = require('../../utils/auth');
const AuthorizationService = require('../../services/AuthorizationService');

const authorizationService = new AuthorizationService();

router.all('*',withAuth);

// The /app/cookbook endpoint for getting the form to create a new cookbook
router.get("/", async (req, res) => {
  try {
    // Gets current user ID for later use
    const creator_id = req.session.user.id;

        res.render('app-cookbook-create', {creator_id: creator_id,
        logged_in: req.session.logged_in,
    active: req.session.active});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:cookbook_id', async (req, res) => {
    try {
        // Get user ID from the session
        const userId = req.session.user.id; 

        // if(!req.params.shared) {
        //     // TODO: Query shared cookin bookins
        // }

        // Retrieve the specified cookbook for the logged-in user
        let cookbookData = await Cookbook.findOne({
            where: {
                id: req.params.cookbook_id,
                // creator_id: userId
            },
            include: [{
                model: Recipe,
                include: {
                    model: User,
                }
            },
            'creator'
        ]
        });

        // Check if the cookbook exists
        if (!cookbookData) {
            return res.status(404).render('404', { logged_in: req.session.logged_in,
                active: req.session.active });
        }

        const PERMISSIONS = await authorizationService.getCookbookPermissions(userId,cookbookData);

        if(!authorizationService.getAuthorized().includes(PERMISSIONS)) {
            const error = {
                code: 401,
                message: "This cookbook is private and not shared with you."
            }
            return res.status(401).render('error', {
                logged_in: req.session.logged_in,
                active: req.session.active,
                error:error
            });
        } 

        const isOwner = PERMISSIONS === 'owner';
        const isEditor = (PERMISSIONS === 'editor' || isOwner); 

        // Get the cookbook as a plain object
        const cookbook = cookbookData.get({ plain: true });
        console.log(cookbook);

        // Render the page with the cookbook, user ID, and logged-in status
        res.render('app-cookbook', { 
            ...cookbook, 
            user_id: userId,
            logged_in: req.session.logged_in,
            isEditor: isEditor,
            isOwner: isOwner,
        active: req.session.active });
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
        userCookbook.get({ plain: true })
        );
        console.log(userCookbooks)

        // Gets current user ID for later use
        const creator_id = req.session.user.id;

        res.render('app-cookbook-update', { 
            cookbook, 
            users,
            userCookbooks, 
            creator_id: creator_id,
            logged_in: req.session.logged_in,
        active: req.session.active  });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
