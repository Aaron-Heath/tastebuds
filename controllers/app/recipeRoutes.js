const router = require('express').Router();
const { Cookbook, Recipe, User } = require('../../models')
const withAuth = require('../../utils/auth');
router.all('*', withAuth);

// The /app/recipe endpoint for getting the form to create a new recipe
router.get('/', async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user.id);

        // Get cookbooks that user can edit
        const sharedCookbookData = await userData.getCookbooks({
            through: {
                where: {
                    permissions: 'editor'
                }
            }
        });
        console.log(req.session.user.id);
        // console.log(sharedCookbookData);

        const sharedCookbooks = await sharedCookbookData.map((cookbook) => cookbook.get());
        console.log(sharedCookbooks);


        const dbCookbookData = await Cookbook.findAll({
            where: {
                creator_id: req.session.user.id
            }
        });

        // Pulls list of available cookbooks for dropdown menu
        const cookbooks = await dbCookbookData.map((cookbook) =>
            cookbook.get({ plain: true })
        );

        // Add shared cookbooks to cookbook list
        cookbooks.push(...sharedCookbooks);
        console.log(cookbooks);

        const creator_id = req.session.user.id;


        res.render('app-recipe-create', {
            cookbooks: cookbooks,
            creator_id: creator_id,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // Temporary Recipe for data purposes
    const recipe = {
        title: "Popcorn",
        creator_id: 1,
        ingredients: [
            "5oz popcorn kernels",
            "Heat"
        ],
        directions: [
            {
                step: 1,
                direction: "Put bag in microwave."
            },
            {
                step: 2,
                direction: "Pop the corn."
            },
            {
                step: 3,
                direction: "Stop it before it burns."
            },

        ]
    }
    res.render("app-recipe", { recipe });
});

// The /app/recipe/update/:id endpoint for looking at specific recipes
router.get('/update/:id', async (req, res) => {
    try {
        const dbRecipeData = await Recipe.findByPk(req.params.id);

        const recipe = dbRecipeData.get({ plain: true });
        console.log(recipe)

        const creator_id = req.session.user.id;

        res.render('app-recipe-update', {
            recipe,
            creator_id: creator_id,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})
module.exports = router;