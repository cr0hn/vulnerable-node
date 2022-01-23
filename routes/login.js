var log4js = require("log4js");
var url = require("url");
var express = require('express');
var auth = require("../model/auth");
var router = express.Router();
const { Octokit } = require("@octokit/rest");

var logger = log4js.getLogger('vnode')

// Login template
router.get('/login', function(req, res, next) {

    var url_params = url.parse(req.url, true).query;

    res.render('login', {returnurl: url_params.returnurl, auth_error: url_params.error});
});


// Do auth
router.post('/login/auth', function(req, res) {

    var user = req.body.username;
    var password = req.body.password;
    var returnurl = req.body.returnurl;

    logger.error("Tried to login attempt from user = " + user);

    auth(user, password)
        .then(function (data) {
            req.session.logged = true;
            req.session.user_name = user;

            if (returnurl == undefined || returnurl == ""){
                returnurl = "/";
            }

            res.redirect(returnurl);
        })
        .catch(function (err) {
            res.redirect("/login?returnurl=" + returnurl + "&error=" + err.message);
        });

});

// Do logout
router.get('/logout', function(req, res, next) {

    req.session.logged = false;
    req.session.user = null;

    res.redirect("/login")
});

// Make github api call
router.get('/github/:user', function (req, res, next) {
    var user = req.params.user;

    const octokit = new Octokit({
        auth: "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"
    });

    octokit.users.get({
        username: user
    }).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        });
});

module.exports = router;
