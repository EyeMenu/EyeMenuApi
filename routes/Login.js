var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var ServerName = req.body.ServerName;
  var Password = req.body.Password;
  connection.query('SELECT ServerName, Password from servers WHERE ServerName = "' + ServerName + '" AND Password = "' + Password + '";', function (error, results, fields) {
      if(error){
        res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
        //If there is error, we send the error in the error section with 500 status
      } else {
        if(results < 3){
          res.send(JSON.stringify({"state": false}));
        }
        else {
          res.send(JSON.stringify({"state": true}));
        }
      }
    });
});

module.exports = router;
