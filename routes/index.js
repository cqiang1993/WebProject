var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/index', { title: '备课平台' });
});

module.exports = router;
