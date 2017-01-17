/* DEPENDENCIES INLADEN
------------------------------------------------------- */
const express = require('express');
const router = express.Router();

/* MAIN LEARN ROUTER
------------------------------------------------------- */
router.get('/', function(req, res) {
  res.render('start/index');
});

module.exports = router;
