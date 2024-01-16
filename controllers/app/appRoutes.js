const { User, Recipe } = require('../../models');
const Cookbook = require('../../models/Cookbook');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

// router.all('*',withAuth);
// router.get('/', async (req,res) => {
//     const cookbookData = await Cookbook.findAll({
//         where: {
//             creator_id: req.session.user.id
//         }});
//     const cookbooks = cookbookData.map((cookbook) => 
//         cookbook.get({plain: true}));

//     const userData = await User.findByPk(req.session.user.id);

    // const sharedCookbookData = await userData.getCookbooks();
    // const sharedCookbooks = sharedCookbookData.map(sharedCookbook => sharedCookbook.get());
    // const user = userData.get();
    
    // // add shared parameter
    // for(let cookbook of sharedCookbooks) {
    //     cookbook.shared = true;
    // }

//     res.render('app-home', { 
//         cookbooks: cookbooks,
//         sharedCookbooks: sharedCookbooks,
//         user: user, 
//         logged_in: req.session.logged_in });
// });
router.all('*', withAuth);

router.get('/', async (req, res) => {
    try {
        const creatorId = req.session.user.id;

        // Log to check if counts are obtained correctly
        const cookbookCount = await getCookbookCount(creatorId);
        const recipeCount = await getRecipeCount();
        console.log('Cookbook Count:', cookbookCount);
        console.log('Recipe Count:', recipeCount);

        const cookbookData = await Cookbook.findAll({
            where: {
                creator_id: creatorId
            }
        });

        const cookbooks = cookbookData.map((cookbook) =>
            cookbook.get({ plain: true })
        );

        const userData = await User.findByPk(creatorId);

        const sharedCookbookData = await userData.getCookbooks();
        const sharedCookbooks = sharedCookbookData.map((sharedCookbook) =>
            sharedCookbook.get()
        );

        const user = userData.get();

        res.render('app-home', {
            cookbooks: cookbooks,
            sharedCookbooks: sharedCookbooks,
            user: user,
            cookbookCount: cookbookCount,  // Make sure variable names match the template
            recipeCount: recipeCount,      // Make sure variable names match the template
            logged_in: req.session.logged_in
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

router.get('/cookbook/:cookbook_id', async (req, res) => {
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
            include: Recipe
        });

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


router.get('/public', (req, res) => {
    res.render('app-public', { logged_in: req.session.logged_in });
});


module.exports = router;
