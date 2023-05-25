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
        "account":frontrun.getUser(),
        "poolSourceTokenAmount":frontrun.getSourceTokenAmount(),
        "poolDstTokenAmount":frontrun.getDstTokenAmount(),
        "originalAmount": frontrun.getOriginalAmount(),
        "totalTransaction": frontrun.getSucceedTransaction(),
    };
    res.json({ data });
});

app.get("/setData", function (req, res) {
    var dstTokenAddress = req.query.dstTokenAddress;
    var plsAttackingAmount = req.query.plsAttackingAmount;

    frontrun.restart(dstTokenAddress, plsAttackingAmount);
});

app.listen(process.env.PORT || 80, () => console.log('Listening on port 80'));