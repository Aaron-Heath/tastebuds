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
        recipeCount: recipeCount, 
        cookbookCount: cookbookCount,
        user: user, 
        logged_in: req.session.logged_in,
        active: req.session.active
     });
});

router.get('/public', (req, res) => {
    res.render('app-public', { logged_in: req.session.logged_in,
    active: req.session.active });
});


module.exports = router;
