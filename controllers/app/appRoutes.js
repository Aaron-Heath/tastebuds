const Cookbook = require('../../models/Cookbook');

const router = require('express').Router();

router.get('/', async (req,res) => {
    console.log(req.session.user.id);
    const cookbookData = await Cookbook.findAll({
        where: {
            creator_id: req.session.user.id
        }});
    const cookbooks = cookbookData.map((cookbook) => 
        cookbook.get({plain: true}));
    console.log(cookbooks);
    res.render('app-home', { cookbooks });
});

router.get('/cookbook/:cookbook_id', async (req,res) => {
    const cookbookData = await Cookbook.findOne({
        where: {
            id : req.params.cookbook_id
        }
    });

    // console.log(cookbookData);


    // const cookbook = cookbookData.map((cookbook) => {
    //     cookbook.get({plain: true});
    // });
    const cookbook = cookbookData.get({plan: true});
    res.render('app-cookbook', { ...cookbook, logged_in: req.session.logged_in });
});

router.get('/public', async (req,res) => {
    res.render('app-public');
});

module.exports = router;