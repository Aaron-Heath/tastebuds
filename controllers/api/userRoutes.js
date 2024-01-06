const router = require('express').Router();
const { User , Cookbook } = require('../../models');
const MailService = require('../../services/MailService');

const mailService = new MailService();

router.post('/signup', async (req,res) => {
    console.log("Post request heard")
    // console.log(req.body);
    try {
        // Create user in db
        console.log("Creating user");
        const userData = await User.create(req.body);

        // Create default private cookbook
        console.log("Creating cookbook");
        const cookBookData = await Cookbook.create(
            {
                creator_id: userData.id,
                title: "My Cookbook",
                isPublic: false,
                description: "This is my default cookbook!",
                viewers: null,
                editors: null,
                recipes: null,
            }
        );
        
        // Send verification email to user
        await mailService.sendVerificationEmail(userData);
        
        // TODO - Redirect to login
        res.json({
            message: "Success!"
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    // TODO: Implement POST login logic

    // Validate password against stored user

    // If valid password, provide session

    // Else respond with bad request (or other appropriate status code)
});

module.exports = router;