const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
        res.statusCode = 200;
        res.json({results: 'teste'});
});

module.exports = router;