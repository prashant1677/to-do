const express = require("express");
const router = express.Router();

const TaskController = require("../controller/tasks");

const checkAuth = require("../middleware/check-auth");


router.get("/fetchTasks", TaskController.fetchTasks);

// router.get("demoFetch", TaskController.demoFetch);

router.post("/saveTask", checkAuth, TaskController.saveTask);

router.post("/swapTask", checkAuth, TaskController.swapTask);

router.post("/deleteTask", checkAuth, TaskController.deleteTask);

router.post("/addBucket", checkAuth, TaskController.addBucket);

router.post("/deleteBucket", checkAuth, TaskController.deleteBucket);

module.exports = router;








// const { response } = require("express");
// const express = require("express");
// const checkAuth = require('../middleware/check-auth');
// // const Post = require("../models/tasks");

// const router = express.Router();
// var dbService = require("../db.service");
// const driver = dbService.getDriver();
// // const userId = '6b2b1e44-ae85-48b4-9037-5af9d6aa1792';
// // const userId = '85f4aae7-c2f9-41a8-bc74-23040a5e4d2a';


// router.get('/fetch', function (req, res) {
//     console.log("In home url / for fetching data working::");
//     console.log("UserId::",req.userData);
//     var userId = req.userData.userId;
//     var taskFetchSession = driver.session();
//     // res.send('Hello World')
//     // var query = 'MATCH (t:Task) RETURN t.id as id, t.name as name, t.description as desc, t.statusCode as statusCode';
//     var query = `MATCH (p:Person{id:"${userId}"})-[:HAS_TAG]->(tg:Tag)-[:HAS_TASK]->(t:Task) 
//     WITH tg.statusCode as statusCode, Collect ({id:t.id , name:t.name , description:t.description, statusCode:t.statusCode }) as task
//     return statusCode, task`;


//     console.log("Fetch Query::" + query);
//     var taskList = {
//         newTasks: [],
//         inProgressTasks: [],
//         doneTasks: []
//     };

//     taskFetchSession
//         .run(query)
//         .then(result => {
//             result.records.forEach(record => {
//                 // taskList.push(result.records);
//                 var statusCode = parseInt(record.get('statusCode'));
//                 if (statusCode == 0) {
//                     taskList.newTasks = record.get('task');
//                     // .push({
//                     //     id: record.get('id'),
//                     //     name: record.get('name'),
//                     //     description: record.get('desc'),
//                     //     statusCode: statusCode
//                     // })
//                 }
//                 else if (statusCode == 1) {
//                     taskList.inProgressTasks = record.get('task');

//                 }
//                 else if (statusCode == 2) {
//                     taskList.doneTasks = record.get('task');

//                 }
//             })

//             console.log("jsonToSend::" + taskList);
//             res.status(200).json({
//                 message: "Success",
//                 taskList: taskList
//             })
//         }

//         )
//         .catch(error => {
//             console.log(error)
//         })
//         .then(() => taskFetchSession.close())
// })

// router.post('/saveTask',checkAuth, function (req, res) {
//     console.log("in save Task");
//     var taskId = req.body.taskId;
//     var name = req.body.name;
//     var description = req.body.description;
//     var statusCode = req.body.statusCode;
//     console.log("Inside task.js saveTask::", description + " --- " + statusCode);
//     var saveTaskSession = driver.session();
//     // var query1 = `CREATE (t:Task {id: apoc.create.uuid(), name: "${name}", description: "${description}", statusCode:${statusCode}}) RETURN ID(t) as id, t.name as name`;

//     var query = `MERGE (t:Task {id: "${taskId}"}) 
//                     ON CREATE
//                         SET t.id= apoc.create.uuid(), t.name= "${name}", t.description= "${description}", t.statusCode=${statusCode}
//                     ON MATCH
//                         SET  t.name= "${name}", t.description= "${description}", t.statusCode=${statusCode}
//                     WITH t
//                     MATCH (p:Person {id: '${userId}'})-[:HAS_TAG]->(tg:Tag{statusCode: ${statusCode}}) 
//                     MERGE (tg)-[:HAS_TASK]->(t)
//                         RETURN t.id as taskId, t.name as name`;
//     //  var query = '';
//     //  id=='-1'? query= query1: query= query2;

//     console.log("Inside database::", query);
//     var taskList = [];
//     saveTaskSession
//         .run(query)
//         .then(result => {
//             result.records.forEach(record => {
//                 console.log(record.get('name'));
//                 taskList.push({
//                     taskId: record.get('taskId'),
//                     name: record.get('name')

//                     // description: record.get('desc'),
//                     // statusCode: parseInt(record.get('statusCode'))
//                     // console.log(record.get('desc'))
//                     // console.log(parseInt(record.get('statusCode')))
//                 })
//             })
//             console.log("jsonToSend::" + taskList[0].name);
//             res.status(200).json({
//                 message: "Success",
//                 data: taskList
//             })
//         }
//         )
//         .catch(error => {
//             console.log(error)
//         })
//         .then(() => saveTaskSession.close())
// })

// router.post('/deleteTask', checkAuth, function (req, res) {
//     console.log("Inside task.js deleteTask");

//     var taskId = req.body.taskId;
//     // var statusCode = req.body.statusCode;
//     console.log("Inside task.js deleteTask::", taskId);
//     var saveTaskSession = driver.session();
//     var query = `MATCH (t:Task) WHERE t.id='${taskId}' DETACH DELETE t`;
//     console.log("Inside database::", query);
//     var taskList = [];
//     saveTaskSession
//         .run(query)
//         .then(result => {
//             console.log("Success::");
//         },
//             res.status(200).json({
//                 message: "Success",
//             })
//         )
//         .catch(error => {
//             console.log(error)
//         })
//         .then(() => saveTaskSession.close())
// })

// router.post('/swapTask', checkAuth, function (req, res) {
//     console.log("in swap Task");
//     var taskId = req.body.taskId;
//     var srcOrderArray = req.body.srcOrderArray;
//     var dstOrderArray = req.body.dstOrderArray;
//     // var name = req.body.name;
//     // var description = req.body.description;
//     var statusCode = req.body.statusCode;
//     console.log("Inside task.js swapTask::", taskId + " --- " + statusCode + " src=" + srcOrderArray + " dst=" + dstOrderArray);
//     var swapTaskSession = driver.session();

//     var query = `MATCH (p:Person{id:'${userId}'})-[:HAS_TAG]->(tg1:Tag)-[ht:HAS_TASK]->(t:Task{id:"${taskId}"}) 
//     SET t.statusCode = ${statusCode}, tg1.orderArray= '${srcOrderArray}' delete ht WITH t
//     MATCH (tg:Tag{statusCode:${statusCode} }) SET tg.orderArray= '${dstOrderArray}'
//     CREATE (tg)-[:HAS_TASK]->(t)
//     RETURN t.id`;
//     //  id=='-1'? query= query1: query= query2;

//     console.log("Inside database::", query);
//     var taskList = [];
//     swapTaskSession
//         .run(query)

//         .then(result => {
//             console.log("Success::");
//         },
//             res.status(200).json({
//                 message: "Success"
//             })
//         )
//         .catch(error => {
//             console.log(error)
//         })
//         .then(() => swapTaskSession.close())
// })

// router.get('/demofetch', function (req, res) {
//     console.log("TEST API for 'get' In home url / ");

//     res.status(200).json({
//         message: "Success",
//         taskList: "taskList"

//     })
// });

// // router.post("", (req, res, next) => {
// //   const post = new Post({
// //     title: req.body.title,
// //     content: req.body.content
// //   });
// //   post.save().then(createdPost => {
// //     res.status(201).json({
// //       message: "Post added successfully",
// //       postId: createdPost._id
// //     });
// //   });
// // });

// // router.put("/:id", (req, res, next) => {
// //   const post = new Post({
// //     _id: req.body.id,
// //     title: req.body.title,
// //     content: req.body.content
// //   });
// //   Post.updateOne({ _id: req.params.id }, post).then(result => {
// //     res.status(200).json({ message: "Update successful!" });
// //   });
// // });

// // router.get("", (req, res, next) => {
// //   Post.find().then(documents => {
// //     res.status(200).json({
// //       message: "Posts fetched successfully!",
// //       posts: documents
// //     });
// //   });
// // });

// // router.get("/:id", (req, res, next) => {
// //   Post.findById(req.params.id).then(post => {
// //     if (post) {
// //       res.status(200).json(post);
// //     } else {
// //       res.status(404).json({ message: "Post not found!" });
// //     }
// //   });
// // });

// // router.delete("/:id", (req, res, next) => {
// //   Post.deleteOne({ _id: req.params.id }).then(result => {
// //     console.log(result);
// //     res.status(200).json({ message: "Post deleted!" });
// //   });
// // });

// module.exports = router;
