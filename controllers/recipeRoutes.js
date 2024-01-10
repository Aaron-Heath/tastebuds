const router = require('express').Router();
const { Cookbook } = require('../models')

// The /recipe route
router.get('/', async (req, res) => {

    const dbCookbookData = await Cookbook.findAll();

    const cookbooks = await dbCookbookData.map((cookbook) => 
    cookbook.get({ plain: true})
    );

    res.render('recipe', {
        cookbooks,
    });
});

module.exports = router;