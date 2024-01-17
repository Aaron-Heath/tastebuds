const { Cookbook, User, UserCookbook } = require('../../models')

const router = require('express').Router();

// Creating UserCookbook model
// The /api/cookbook/share endpoint
router.post('/', async (req, res) => {
    try {
        const newUserCookbook = await UserCookbook.create
        (
            {
                user_id: req.body.user_id,
                cookbook_id: req.body.cookbook_id,
                permissions: req.body.permissions
            }
        );
;
        console.log('Successful share')
        res.json(newUserCookbook)
    } catch (err) {
        res.status(500).json(err);
    };
});

// Updating user cookbook model
// The /api/cookbook/share endpoint
router.put('/', async (req, res) => {
    try {
        
        const updatedUserCookbook = await UserCookbook.update(
            {
                permissions: req.body.permissions,
            },
            {
                where: {
                    user_id: req.body.user_id,
                    cookbook_id: req.body.cookbook_id
                }
            }
        );

        console.log('Successful share update');
        res.json(updatedUserCookbook)
    } catch (err) {
        res.status(500).json(err);
    };
});

module.exports = router;