const router = require("express").Router();
const sequelize = require("sequelize");
const { User, Cookbook } = require("../../models");
const MailService = require("../../services/MailService");
const UserService = require("../../services/UserService");
const CookbookService = require("../../services/CookbookService");

const { uuid } = require('uuidv4');

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

  const userResult = await UserService.createUser({...req.body});

  if(!userResult.success) {
    res.status(409).json(userResult.message);
    return;
  }

  const cookbookResult = await CookbookService.createDefaultCookbook(userResult.data);

  if(!cookbookResult.success) {
    res.status(500).json({message:"User creation successful. Default cookbook failed."})
    return;
  }

  // send verification email
  MailService.sendVerificationEmail(userResult.data);

  res.status(200).json({message: userResult.message});

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
          req.session.active = user.validated;

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

router.post('/logout', async (req,res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;
