var express = require('express');
var router = express.Router();
var common = require('./common');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond from /wechat');
});

router.use('/common', common);


module.exports = router;
