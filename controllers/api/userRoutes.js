const router = require("express").Router();
const { User, Cookbook } = require("../../models");
const MailService = require("../../services/MailService");


const mailService = new MailService();

router.post("/signup", async (req, res) => {
  console.log("Post request heard");
  // console.log(req.body);
  try {
    // Create user in db
    console.log("Creating user");
    const userData = await User.create(req.body);

    // Create default private cookbook
    console.log("Creating cookbook");
    const cookBookData = await Cookbook.create({
      creator_id: userData.id,
      title: "My Cookbook",
      isPublic: false,
      description: "This is my default cookbook!",
      viewers: null,
      editors: null,
      recipes: null,
    });

    // Send verification email to user
    await mailService.sendVerificationEmail(userData);

    // TODO - Redirect to login
    res.json({
      message: "Success!",
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Finds the user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Validates password against stored user
        const isPasswordValid = await user.checkPassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Created and store a session (e.g., using a session middleware)
        req.session.save(() => {
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
            };
            req.session.loggedIn = true;
        });


        // Send JSON response with success message and user information
        res.json({
            message: 'Login successful',
            user: req.session.user,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
