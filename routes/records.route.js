var routes = require('express').Router();
var record = require('./models/records.model');


// POST create a new game record
routes.post('/', function (req, res) {
    if (!req.body.username || req.body.points) {
        return res.status(422).send({error: 'Missing data'});
    }
    var newRecord = new record({
        username : req.body.username,
        points : parseFloat(req.body.points)
    });
    newRecord.save(function (err) {
        if (err) {
            return res.status(403).send({error : err})
        }
        return res.send({record : newRecord});
    });
});

// GET get a game record by id
routes.get('id/:id', function (req, res) {
   if (!req.params.id) {
       return res.status(422).send({error: 'record not found'});
   }
   record.findById(req.params.id).select('_id username points').exec(function (err, record) {
       if (err) {
           return res.status(403).send({error : err});
       }
       if (!record) {
           return res.status(403).send({error : 'This record does not exists'});
       }
       return res.send({record: record});
   });
});

// GET get game record by token
routes.get('token/:token', function (req, res) {
    if (!req.params.token) {
        return res.status(422).send({error: 'token not found'});
    }
    record.findOne({
        token: req.params.token
    }).select('_id username points').exec(function (err, record) {
        if (err) {
            return res.status(403).send({error : err});
        }
        if (!record) {
            return res.status(403).send({error : 'This record does not exists'});
        }
        return res.send({record: record});
    });
});


// PUT update a existing game record
routes.put('/', function (req, res) {
   if (!req.body.token || !req.body.points) {
       return res.status(422).send({error: 'record not found'});
   }
    record.findOne({
        token: req.body.token
    }).exec(function (err, record) {
       if (err) {
           return res.status(403).send({error : err});
       }
       if(parseFloat(req.body.points) > record.points) {
           record.points = parseFloat(req.body.points);
       }
        if (!record) {
            return res.status(403).send({error : 'This record does not exists'});
        }
       record.save(function (err) {
           if (err) {
               return res.status(403).send({error : err});
           }
           return res.send({record: record});
       });
       // text
    });
});

module.exports = routes;