const axios = require('axios');
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');

var app = express();
var frontrun = require('./frontrun.js');

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());

frontrun.main();

app.get("/getData", function (req, res) {
    var data = {
        "dstTokenAddress": frontrun.DST_TOKEN_ADDRESS,
        "attackAmount":frontrun.ATTACK_AMOUNT,
    };
    res.json({ data });
});