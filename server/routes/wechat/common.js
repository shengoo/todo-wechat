var express = require('express');
var router = express.Router();
var request = require('request');

// parent is `/wechat/common`

router.get('/', function(req, res, next) {
    res.send('/common');
});

router.get('/jscode2session', function(req, res, next) {
    if(req.query.appid && req.query.code){
        var app = secrets.find(x => x.appid === req.query.appid);
        if(app) {
            request(`https://api.weixin.qq.com/sns/jscode2session?appid=wx8160814f8957a587&secret=${app.secret}&js_code=${req.query.code}&grant_type=authorization_code`).pipe(res);
        } else {
            res.json('appid wrong');
        }
    }else {
        res.json('no code or appid');
    }
});

const secrets = [
    {
        name: 'todo',
        appid: 'wx8160814f8957a587',
        secret: '9bc57295788732fbadb9c18f11a2b1ed',
    }
];

module.exports = router;
