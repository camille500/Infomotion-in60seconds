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

router.get('/list-1', function(req, res) {
  res.render('start/list-1');
});

router.get('/list-2', function(req, res) {
  res.render('start/list-2');
});

router.get('/list-3', function(req, res) {
  res.render('start/list-3');
});


module.exports = router;
