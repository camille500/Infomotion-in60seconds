/* DEPENDENCIES INLADEN
------------------------------------------------------- */
const express = require('express');
const router = express.Router();

/* MAIN LEARN ROUTER
------------------------------------------------------- */
router.get('/', function(req, res) {
  res.render('start/index');
});

router.get('/stap-1', function(req, res) {
  res.render('start/stap-1');
});

router.get('/stap-2', function(req, res) {
  res.render('start/stap-2');
});

module.exports = router;
