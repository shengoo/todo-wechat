var express = require('express');
var router = express.Router();
var wechat = require('./wechat');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/wechat', wechat);

module.exports = router;
