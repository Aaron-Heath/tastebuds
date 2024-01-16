const { Cookbook, UserCookbook } = require('../../models');

const router = require('express').Router();

// Creating cookbooks
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

        // Creates new UserCookbook model to link newly created cookbook with users
        await UserCookbook.create(
            {
                user_id: req.body.user_id,
                cookbook_id: req.body.cookbook_id,
                permissions: req.body.permissions
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
            
        await UserCookbook.update(
            {
                user_id: req.body.user_id,
                permissions: req.body.permissions
            },
            {
                where: {
                    cookbook_id: req.params.cookbook_id
                }
            }
        )

        console.log('updated cookbook');
        res.json(updatedCookbook);
    }catch (err) {
        res.status(500).json(err);
    };
});

//Delete cookbook
router.delete('/:cookbook_id', async (req, res) => {
    try {
        const deleteCookbook = await Cookbook.destroy(
            {
                where: {
                    id: req.params.cookbook_id,
                },
            },
        );
        console.log('Cookbook deleted');
        res.json(deleteCookbook);
    }catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;