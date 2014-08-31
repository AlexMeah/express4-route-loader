var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('api /');
});

router.get('/test', function (req, res) {
    res.send('api /test');
});

module.exports = router;
