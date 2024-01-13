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
    console.log(cookbooks);
    res.render('app-home', { cookbooks, logged_in: req.session.logged_in });
});



router.get('/cookbook/:cookbook_id', async (req,res) => {
    const cookbookData = await Cookbook.findOne({
        where: {
            id : req.params.cookbook_id
        }
    });

    const cookbook = cookbookData.get({plan: true});
    res.render('app-cookbook', { ...cookbook, logged_in: req.session.logged_in });
});

router.get('/public', async (req,res) => {
    res.render('app-public', {logged_in: req.session.logged_in});
});



module.exports = router;
// const Cookbook = require('../../models/Cookbook');
// const User = require('../../models/User')
// const withAuth = require('../../utils/auth');

// const router = require('express').Router();

// router.all('*', withAuth);

// router.get('/', async (req, res) => {
//     try {
//         // Get user ID from the session
//         const userId = req.session.user.id;

//         // Retrieve cookbooks for the logged-in user
//         const cookbookData = await Cookbook.findAll({
//             where: {
//                 creator_id: req.session.userId
//             }
//         });

//         const userData = await User.findByPk(userId);

//         // Map cookbooks to plain objects
//         const cookbooks = cookbookData.map((cookbook) =>
//             cookbook.get({ plain: true })
//         );
//         console.log('User Data:', userData);
//         console.log(cookbooks);

//         // Render the page with cookbooks and user ID
//         res.render('app-home', { cookbooks, userData, logged_in: req.session.logged_in });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Failed to retrieve data' });
//     }
// });

// router.get('/cookbook/:cookbook_id', async (req, res) => {
//     try {
//         // Get user ID from the session
//         const userId = req.session.user.id;

//         // Retrieve the specified cookbook for the logged-in user
//         const cookbookData = await Cookbook.findOne({
//             where: {
//                 id: req.params.cookbook_id,
//                 creator_id: userId
//             }
//         });

//         // Check if the cookbook exists
//         if (!cookbookData) {
//             return res.status(404).render('404', { logged_in: req.session.logged_in });
//         }

//         // Get the cookbook as a plain object
//         const cookbook = cookbookData.get({ plain: true });

//         // Render the page with the cookbook, user ID, and logged-in status
//         res.render('app-cookbook', { ...cookbook, user_id: userId, logged_in: req.session.logged_in });
//     } catch (error) {
//         console.error('Error:', error.message);
//         res.status(500).json({ error: 'Failed to retrieve data' });
//     }
// });

// router.get('/public', (req, res) => {
//     res.render('app-public', { logged_in: req.session.logged_in });
// });

// module.exports = router;
