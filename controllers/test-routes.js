const router = require('express').Router();

router.get('/', async (req, res) => {
    const response = {
        message: "This is a test. It's working!"
    };

    res.json(response);
});

module.exports = router;