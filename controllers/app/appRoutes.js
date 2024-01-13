const { User } = require('../../models');
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

    const userData = await User.findByPk(req.session.user.id);

    const sharedCookbookData = await userData.getCookbooks();
    const sharedCookbooks = sharedCookbookData.map(sharedCookbook => sharedCookbook.get());
    const user = userData.get();
    // console.log(userData.get());

    res.render('app-home', { 
        cookbooks: cookbooks,
        sharedCookbooks: sharedCookbooks,
        user: user, 
        logged_in: req.session.logged_in });
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