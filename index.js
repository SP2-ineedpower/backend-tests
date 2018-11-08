const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host     : 'dt5.ehb.be',
    user     : '1819SP2_oneforall',
    password : 'NjGkqLQ',
    database : '1819SP2_oneforall'
});

connection.connect((error) => {
    if (error) {
        console.log('Error');
    }else {
        console.log('MySQL Database Connected');
    }
});

//Select all users from the database
app.get('/users', (req, res)=>{
   let sqlCommand = 'SELECT * FROM user';
   let query = connection.query(sqlCommand, (err, results)=>{
      if(err) console.log("Error");
      console.log(results);
      res.send(results);
   });
});

//Select a specific user from the database, based on the ID
app.get('/users/:id', (req, res)=>{
    let query = connection.query("SELECT * FROM user WHERE userId = ?", [req.params.id], (err, result)=>{
        if(err) console.log("Error");
        console.log(result);
        res.send(result);
    });
});

//Delete a specific user from the database, based on the ID
app.delete('/users/:id', (req, res)=>{
    let query = connection.query("DELETE FROM user WHERE userId = ?", [req.params.id], (err, result)=>{
        if(err) console.log("Error");
        res.send(`User with ID ${req.params.id} is deleted`);
    });
});

//Select all projects from the database
app.get('/displayProjects', (req, res)=>{
    let sqlCommand = 'SELECT * FROM project';
    let query = connection.query(sqlCommand, (err, results)=>{
        if(err) console.log("Error");
        console.log(results);
        res.send(results);
    });
});

//Select a project from the database, based on its ID
app.get('/displayProjects/:id', (req, res)=>{
    let query = connection.query("SELECT * FROM project WHERE projectId = ?", [req.params.id], (err, results)=>{
        if(err) console.log("Error");
        console.log(results);
        res.send(results);
    });
});


app.listen('5000', () => console.log("Server started on port 5000"));

