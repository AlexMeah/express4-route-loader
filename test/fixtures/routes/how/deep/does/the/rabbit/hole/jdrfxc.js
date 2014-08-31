var express = require('express');
var router = express.Router();

router.get('/go', function (req, res) {
    res.send('pretty damn deep');
});

module.exports = router;
