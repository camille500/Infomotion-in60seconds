/* DEPENDENCIES INLADEN
------------------------------------------------------- */
const express = require('express');
const router = express.Router();

/* MAIN LEARN ROUTER
------------------------------------------------------- */
router.get('/', function(req, res) {
  res.render('result/index');
});

router.get('/friends', function(req, res) {
  res.render('result/friends');
});

module.exports = router;
