const { Cookbook } = require('../../models');

const router = require('express').Router();


// creating cookbooks
router.post('/', async (req,res) => {
    // creates new cookbook
    try {
        const newCookbook = await Cookbook.create
        (
            {
                title: req.body.title,
                description: req.body.description,
                creator_id: req.session.user
            }
        );
    } catch (err) {
        res.status(500).json(err);
    };
});

// updating cookbook
router.put('/:cookbook_id', async (req, res) => {
    try {
        const updateCookbook = await Cookbook.update(
            {
                title:req.body.title,
                description:req.body.description,
                creator_id: req.session.user
            },
            {
                where: {
                    id: req.params.recipe_id,
                },
            },
        );

        console.log('updated cookbook');
        res.json(updatedCookbook);
    }catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;