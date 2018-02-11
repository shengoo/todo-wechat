var express = require('express');
var router = express.Router();
var request = require('request');
var common = require('./common');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond from wechat');
});

router.use('/common', common);


module.exports = router;
