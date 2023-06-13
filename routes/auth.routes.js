const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(400).send("Welcome to auth routes")
})

module.exports = router;