var express = require('express');
var router = express.Router();
var mongo = require('mongodb');

router.post('/ques', function(req,res)
{
    //res.send('connection ready');

    var que = req.body.que;
    var opt1 = req.body.opt1;
    var opt2 = req.body.opt2;
    var opt3 = req.body.opt3;
    var opt4 = req.body.opt4;
    var ans = req.body.ans;

    var quesObj={

        que:que,
        opt1:opt1,
        opt2:opt2,
        opt3:opt3,
        opt4:opt4,
        ans:ans
    }

    var mongoclient = mongo.MongoClient;
    var mongourl="mongodb://localhost:27017";
    mongoclient.connect(mongourl, function(err,cluster)
     {
       if(err) 
       {
           res.send('connection db error');
       }

       var db = cluster.db('question');
       var collection = db.collection('que');
       collection.insertOne(quesObj,function(e,s)
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