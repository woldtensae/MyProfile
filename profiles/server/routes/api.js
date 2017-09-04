const express = require('express');
const router = express.Router();

const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;


//connection to mongodb
const connection = (closure) => {
    console.log("before connection");
    return mongoClient.connect('mongodb://127.0.0.1:27017/user', (err, db) => {
        closure(db);
    });
}

//Error handling
const sendError = (err,res) => {
    Response.status = 501;
    Response.message = typeof err == 'object' ? err.message:err;
};

//Response Handlling 
let response = {
    status: 200,
    data:[],
    message: null
};

// get profile user
router.get('/user', (req, res) => {
    connection((db) => {
        db.collection('userTable')
          .find()
          .toArray()
          .then((userTable) => {
              response.data = userTable;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
    });
});

module.exports = router;























