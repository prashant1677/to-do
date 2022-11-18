const express = require('express');
const app = express();
const { takeLast } = require('rxjs');

const bodyParser = require("body-parser");
const path = require('path');

const tasksApi = require("./routes/tasks");
const userApi = require("./routes/users");

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/todo", tasksApi);
app.use("/api/user", userApi);
// app.get("/",function(req,res){
//     res.send("IT ACTUALLY WORKS");
// })

app.use(express.static(path.join(__dirname,'angular')));
app.use("/*",function(req,res){
    res.sendFile(path.join(__dirname+"/angular/index.html"));

})



app.get("/test",function(req,res){
    res.send("TESTING ACTUALLY WORKS");
})

module.exports = app;
