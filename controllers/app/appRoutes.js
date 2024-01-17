const { User, Recipe } = require('../../models');
const Cookbook = require('../../models/Cookbook');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.all('*',withAuth);
router.get('/', async (req,res) => {
    const cookbookData = await Cookbook.findAll({
        where: {
            creator_id: req.session.user.id
        }});
    const cookbooks = cookbookData.map((cookbook) => 
        cookbook.get({plain: true}));

    const cookbookCount = cookbooks.length;
    const {recipeCount, recipeRows} = await Recipe.findAndCountAll({
        where: {
            creator_id: req.session.user.id
        }
    })

    const userData = await User.findByPk(req.session.user.id);

    const sharedCookbookData = await userData.getCookbooks();
    const sharedCookbooks = sharedCookbookData.map(sharedCookbook => sharedCookbook.get());
    const user = userData.get();
    
    // add shared parameter
    for(let cookbook of sharedCookbooks) {
        cookbook.shared = true;
    }

    res.render('app-home', { 
        cookbooks: cookbooks,
        sharedCookbooks: sharedCookbooks,
        user: user,
        recipeCount: recipeCount, 
        cookbookCount: cookbookCount,
        logged_in: req.session.logged_in });
});
// router.all('*', withAuth);

// router.get('/', async (req, res) => {
//     try {
//         const creatorId = req.session.user.id;

//         // Log to check if counts are obtained correctly
//         const cookbookCount = await getCookbookCount(creatorId);
//         const recipeCount = await getRecipeCount();
//         console.log('Cookbook Count:', cookbookCount);
//         console.log('Recipe Count:', recipeCount);

//         const cookbookData = await Cookbook.findAll({
//             where: {
//                 creator_id: creatorId
//             }
//         });

//         const cookbooks = cookbookData.map((cookbook) =>
//             cookbook.get({ plain: true })
//         );

//         const userData = await User.findByPk(creatorId);

//         const sharedCookbookData = await userData.getCookbooks();
//         const sharedCookbooks = sharedCookbookData.map((sharedCookbook) =>
//             sharedCookbook.get()
//         );

//         const user = userData.get();

//         res.render('app-home', {
//             cookbooks: cookbooks,
//             sharedCookbooks: sharedCookbooks,
//             user: user,
//             cookbookCount: cookbookCount,  // Make sure variable names match the template
//             recipeCount: recipeCount,      // Make sure variable names match the template
//             logged_in: req.session.logged_in
//         });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Failed to retrieve data' });
//     }
// });



router.get('/public', (req, res) => {
    res.render('app-public', { logged_in: req.session.logged_in });
});


module.exports = router;
