const router = require('express').Router();
const { User , Cookbook } = require('../../models');
const MailService = require('../../services/MailService');
const session = require('express-session');

// express-session middleware
app.use(session({
    secret: '',
    resave: false, 
    saveUninitialized: true
}));

app.use('/controllers', require('./controllers/homeRoutes')); // ROUTES

// Your server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


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
    try {
        const { email, password } = req.body;

        // Find the user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compares the entered password with the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // sessions middleware 
        req.session.userId = user.id;
        req.session.username = user.username;

        // Sends success message and user information
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;