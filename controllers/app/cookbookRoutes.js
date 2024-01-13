const router = require('express').Router();
const { Cookbook } = require('../../models')

// The /app/cookbook/update/:id endpoint for getting the form to create a new cookbook
router.get('/update/:id', async (req, res) => {
    try {
        const dbCookbookData = await Cookbook.findByPk(req.params.id);

        const cookbook = dbCookbookData.get({ plain: true });
        console.log(cookbook);
        
        res.render('app-cookbook-update', { cookbook });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;