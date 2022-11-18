
var dbService = require("../db.service");
const driver = dbService.getDriver();

exports.fetchTasks = (req, res, next) => {
    console.log("In home url / for fetching data working::");
    console.log("UserId::",req.query);
    var userId = req.query.userId;
    var taskFetchSession = driver.session();
 
    var query3 = `match (p:Person{id:"${userId}"})-[:HAS_BUCKET]->(b:Bucket) WITH b 
    OPTIONAL MATCH (b)-[:HAS_TASKS*]->(t) 
    with b.id as bucketId, b.name as bucketName, [t.id, t.name , t.statusCode] as task
    RETURN bucketId, bucketName, COLLECT(task) AS task`;


    console.log("Fetch Query::" + query3);
    var taskList = [];

    taskFetchSession
        .run(query3)
        .then(result => {
            result.records.forEach(record => {
                tasks= [];     
                let bucketId = record.get('bucketId');
                let bucketName = record.get('bucketName');
                // tasks =
                record.get('task').forEach(task=>{
                    if(task[0]== null) return;
                    tasks.push(
                        {
                        id:task[0],
                        name:task[1],
                        statusCode:parseInt(task[2])
                    });
                    // console.log("tasks::",tasks);
                });
                taskList.push({
                bucketId : bucketId,
                bucketName : bucketName,
                tasks:tasks
                })
            })

            console.log("jsonToSend::" + taskList[0].bucketName);
            res.status(200).json({
                message: "Success",
                taskList: taskList
            })
        }

        )
        .catch(error => {
            console.log(error)
        })
        .then(() => taskFetchSession.close())
}

exports.saveTask = (req, res, next) => {
    console.log("in save Task");
    var userId = req.query.userId;
    var taskId = req.body.taskId;
    var name = req.body.name;
    var bucketId = req.body.bucketId;
    // var description = req.body.description;
    // var statusCode = req.body.statusCode;
    console.log("Inside task.js saveTask::", name );
    var saveTaskSession = driver.session();

    var query = `MERGE (t:Task {id: "${taskId}"}) 
                    ON CREATE
                        SET t.id= apoc.create.uuid(), t.name= "${name}"
                    ON MATCH
                        SET  t.name= "${name}"
                    WITH t
                    MATCH (p:Person {id: '${userId}'})-[:HAS_BUCKET]->(b:Bucket{id:"${bucketId}"}) 
                    MERGE (b)-[:HAS_TASKS]->(t)
                        RETURN t.id as taskId, t.name as name`;
    //  var query = '';
    //  id=='-1'? query= query1: query= query2;

    console.log("Inside database::", query);
    var taskList = [];
    saveTaskSession
        .run(query)
        .then(result => {
            result.records.forEach(record => {
                console.log(record.get('name'));
                taskList.push({
                    taskId: record.get('taskId'),
                    name: record.get('name')

                    // description: record.get('desc'),
                    // statusCode: parseInt(record.get('statusCode'))
                    // console.log(record.get('desc'))
                    // console.log(parseInt(record.get('statusCode')))
                })
            })
            console.log("jsonToSend::" + taskList[0].name);
            res.status(200).json({
                message: "Success",
                data: taskList
            })
        }
        )
        .catch(error => {
            console.log(error)
        })
        .then(() => saveTaskSession.close())
}

exports.addBucket = (req, res, next) => {
    console.log("in add Bucket");
    var userId = req.query.userId;
    var bucketName = req.body.bucketName;
    // var name = req.body.name;
    // var bucketId = req.body.bucketId;
    // var description = req.body.description;
    // var statusCode = req.body.statusCode;
    console.log("Inside task.js add bucket::", bucketName);
    var addBucketSession = driver.session();
 
    var query = `CREATE (b:Bucket{id:apoc.create.uuid(), name: "${bucketName}"}) with b
    MATCH (p:Person{id:"${userId}"})
     CREATE (p)-[:HAS_BUCKET]->(b) RETURN b.id as id, b.name as name`;
    
    console.log("Inside database::", query);
    var bucket = {};
    addBucketSession
        .run(query)
        .then(result => {
            result.records.forEach(record => {
                // console.log(record.get('name'));
                bucket.id= record.get('id'),
                bucket.name= record.get('name')
                })
                console.log("jsonToSend::" + bucket.name);
                res.status(200).json({
                    message: "Success",
                    data: bucket
                })
            })
        .catch(error => {
            console.log(error)
        })
        .then(() => addBucketSession.close())
}

exports.deleteBucket = (req, res, next) => {
    console.log("in delete Bucket");
    var userId = req.query.userId;
    var bucketId = req.body.bucketId;
    // var name = req.body.name;
    // var bucketId = req.body.bucketId;
    // var description = req.body.description;
    // var statusCode = req.body.statusCode;
    console.log("Inside task.js add bucket::", bucketId);
    var addBucketSession = driver.session();
 
    var query = `MATCH (b:Bucket{id: "${bucketId}"}) DETACH DELETE b RETURN "success" as success`;
    var status = "failed";
    console.log("Inside database::", query);
    addBucketSession
        .run(query)
        .then(result => {
            result.records.forEach(record => {
                status=record.get('success');
                console.log("status::",status);
             
                // console.log("jsonToSend::" + bucket.name);
            })
            res.status(200).json({
                message: status
            })
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => addBucketSession.close())
}

exports.deleteTask = (req, res, next) => {
    console.log("Inside task.js deleteTask");
    // var userId = req.query.userId;
    var taskId = req.body.taskId;
    // var statusCode = req.body.statusCode;
    console.log("Inside task.js deleteTask::", taskId);
    var saveTaskSession = driver.session();
    var query = `MATCH (t:Task) WHERE t.id='${taskId}' DETACH DELETE t`;
    console.log("Inside database::", query);
    // var taskList = [];
    saveTaskSession
        .run(query)
        .then(result => {
            console.log("Success::");
        },
            res.status(200).json({
                message: "Success",
            })
        )
        .catch(error => {
            console.log(error)
        })
        .then(() => saveTaskSession.close())
}

exports.swapTask = (req, res, next) => {
    console.log("in swap Task");
    var userId = req.query.userId;
    var taskId = req.body.taskId;
    var srcOrderArray = req.body.srcOrderArray;
    var dstOrderArray = req.body.dstOrderArray;
    // var name = req.body.name;
    // var description = req.body.description;
    var statusCode = req.body.statusCode;
    console.log("Inside task.js swapTask::", taskId + " --- " + statusCode + " src=" + srcOrderArray + " dst=" + dstOrderArray);
    var swapTaskSession = driver.session();

    var query = `MATCH (p:Person{id:'${userId}'})-[:HAS_TAG]->(tg1:Tag)-[ht:HAS_TASK]->(t:Task{id:"${taskId}"}) 
    SET t.statusCode = ${statusCode}, tg1.orderArray= '${srcOrderArray}' delete ht WITH t
    MATCH (tg:Tag{statusCode:${statusCode} }) SET tg.orderArray= '${dstOrderArray}'
    CREATE (tg)-[:HAS_TASK]->(t)
    RETURN t.id`;
    //  id=='-1'? query= query1: query= query2;

    console.log("Inside database::", query);
    var taskList = [];
    swapTaskSession
        .run(query)

        .then(result => {
            console.log("Success::");
        },
            res.status(200).json({
                message: "Success"
            })
        )
        .catch(error => {
            console.log(error)
        })
        .then(() => swapTaskSession.close())
}

exports.demoFetch = (req, res, next) => {
    console.log("TEST API for 'get' In home url / ");

    res.status(200).json({
        message: "Success",
        taskList: "taskList"

    })
}