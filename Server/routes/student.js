var express = require('express');
var router = express.Router();
var mongo = require('mongodb');


router.post('/stud-reg', function(req,res)
{
    //res.send('server ready....')

    var name = req.body.name;
    var rno = req.body.rno;
    var email = req.body.email;
    var phone = req.body.phone;

    var studObj={

        name:name,
        rno:rno,
        email:email,
        phone:phone
    }

    var mongoclient = mongo.MongoClient;
    var mongourl='mongodb://localhost:27017';
    mongoclient.connect(mongourl, function(err, cluster)
    {
        if(err)
        {
            res.send('connection error');
        }
        var db = cluster.db('school');
        var collection = db.collection('student');
        collection.insertOne(studObj, function(e,s)
        {
            if(e)
            {
                res.send(e);
            }
            else
            {
                res.send(s);
            }
        })
    })


});

module.exports=router;