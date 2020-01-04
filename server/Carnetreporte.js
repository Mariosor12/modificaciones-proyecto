const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next){
    const data ={
            template:{'shortid': 'H1BFk0qyL'}
    }

    const options = {
        uri:'http://localhost:5488/api/report',
        method:'POST',
        json:data
    }
    request(options).pipe(res);


});

module.exports = router;