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
                isPublic: req.body.isPublic,
                // creator_id: req.session.user.id
                creator_id: req.body.creator_id
            }
        );
        res.json(newCookbook);

    } catch (err) {
        res.status(500).json(err);
    };
});

// updating cookbook
router.put('/:cookbook_id', async (req, res) => {
    try {
        const updatedCookbook = await Cookbook.update(
            {
                title:req.body.title,
                description:req.body.description,
                // creator_id: req.session.user.id
                creator_id: req.body.creator_id
            },
            {
                where: {
                    id: req.params.cookbook_id,
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