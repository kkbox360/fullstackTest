var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  let result = {
    epoch: Math.floor(Date.now() / 1000),
  };

  res.json(result);
});

module.exports = router;
