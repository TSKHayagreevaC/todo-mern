const express = require("express");    
const todoRoutes = express.Router();
 
// Connect to the database
const dbo = require("../db/conn");
 
// ObjectId String.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the todos.
todoRoutes.route("/todo").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
      .collection("todos")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

   // This section will help you get a single todo by id
todoRoutes.route("/todo/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("todos")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

// This section will help you create a new todo.
todoRoutes.route("/todo/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    db_connect.collection("todos").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

// This section will help you update a todo by id.
todoRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };
    db_connect
      .collection("todos")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("document updated");S
        response.json(res);
      });
   });

   // This section will help you delete a todo
todoRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("todos").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });

   module.exports = todoRoutes;