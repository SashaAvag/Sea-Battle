const express = require('express')

const router = express.Router();

router.get('/', (req, res) =>{
    req.send('this is home page');
});


router.get('/players', (req, res) =>{
    req.send('this is players page');
});

module.exports = router;