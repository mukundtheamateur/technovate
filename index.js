var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
     host : "localhost",
     user : "root",
     password : "password",
     database : "online_vidya"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/',function(req,res){

  var sno = req.body.sno;
  var Name = req.body.Name;
  var Phone = req.body.Phone;
  var email = req.body.email;
  var course = req.body.course;
 
  res.write('You sent the sno "' + req.body.sno+'".\n');
  res.write('You sent the name "' + req.body.Name+'".\n');
  res.write('You sent the phoneno "' + req.body.Phone+'".\n');
  res.write('You sent the email "' + req.body.email+'".\n');
  res.write('You sent the course "' + req.body.course+'".\n');



  con.connect(function(err) {
  var sql = "INSERT INTO students (sno, Name, Phone, email, course) VALUES ('"+sno+"','"+Name+"','"+Phone+"', '"+email+"','"+course+"')";
  con.query(sql, function (err, result) {
    if(err){  

          if(err.errno==1062){

  var sql = 'UPDATE students SET Name ="' + req.body.Name+'",Phone="'+ req.body.Phone+'",course="' + req.body.course+'" WHERE email ="'+ req.body.email+'"';
  con.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.affectedRows + " record(s) updated");
  });
          // res.end();

      }
          else{
              throw err;
          // res.end();
        }
  }
    console.log("1 record inserted");
     res.end();
  });
  });
});
app.post('/search',function(req,res){
      con.connect(function(err) {
con.query('SELECT * FROM students ', function (err, result) {
if (err) throw err;
console.log(result);
});
});
});
app.listen(3000);
console.log("Running at Port 3000");