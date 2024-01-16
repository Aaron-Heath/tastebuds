const { Cookbook, UserCookbook, User } = require('../../models');

const router = require('express').Router();

// Creating cookbooks
router.post('/', async (req, res) => {
    // creates new cookbook
    try {
        console.log(req.body)
        const newCookbook = await Cookbook.create
            (
                {
                    creator_id: req.body.creator_id,
                    title: req.body.title,
                    description: req.body.description,
                    isPublic: req.body.isPublic,
                }
            );

        // Gets the viewers and editors array
        const userCookbooksBody = req.body.userCookbookData;
            console.log(userCookbooksBody)
        // Empty array for data viewing purposes
        // Not necessary for process to run
        const createdUserCookbooks = [];

        // Iterates through the array of users and editors, creating the appropriate UserCookbook model
        for (const each of userCookbooksBody) {
            console.log(each)
            // Takes permission key and turns it into a string to fit UserCookbook model
            const permission = String(Object.keys(each));
            // Takes user_id value and turns it into an integer to fit UserCookbook model
            const user_id = parseInt(Object.values(each));

            const newUserCookbook = await UserCookbook.create({
                user_id: user_id,
                cookbook_id: newCookbook.id,
                permissions: permission
            });
            createdUserCookbooks.push(newUserCookbook);
        };

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
                title: req.body.title,
                description: req.body.description,
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
    } catch (err) {
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
    } catch (err) {
        res.status(500).json(err);
    };
});


module.exports = router;