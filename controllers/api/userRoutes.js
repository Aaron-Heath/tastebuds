const router = require("express").Router();
const { User, Cookbook } = require("../../models");
const MailService = require("../../services/MailService");
const { uuid } = require('uuidv4');


const mailService = new MailService();

router.get('/activate', async (req,res) => {

  // Update user with query param passed
  try {
    await User.update(
    {validated: true},
    {where: {uuid:req.query.user}}
  );
  res.redirect('/login');

} catch (err) {
  res.status(404);
}
});

router.post("/signup", async (req, res) => {
  console.log("Post request heard");
  try {
    // Create user in db
    console.log("Creating user");
    const userData = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      uuid: uuid(),
    }
      
    );

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

    res.status(200).json({message:"user created!"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
        // Renamed email to username to properly pull data and query DB. - AH 1/10/2024 
        const { username, password } = req.body;

        // Finds the user by their email
        const user = await User.findOne({
            where: {
                username: username // renamed to username
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
          // req.session.user_id = user.id;
          req.session.logged_in = true;

          // Send JSON response with success message and user information
          res.json({
            message: 'Login successful',
            user: req.session.user,
      });
  
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/post', async (req,res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;
