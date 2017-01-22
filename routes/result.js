/* DEPENDENCIES INLADEN
------------------------------------------------------- */
const express = require('express');
const router = express.Router();

/* MAIN LEARN ROUTER
------------------------------------------------------- */
router.get('/', function(req, res) {
  res.render('result/index');
});

module.exports = router;
