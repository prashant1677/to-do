
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

var dbService = require("../db.service");
const driver = dbService.getDriver();

exports.userLogin= (req, res, next)=> {
    var userName = req.body.userName;
    var password = req.body.password;
    var userInfo = {};
    var authQuery = `MATCH (p:Person{emailId:'${userName}'}) return p.id as userId, p.name as name, p.emailId as emailId, p.password as password `;
    console.log("Auth Query::", authQuery);
    var authSession = driver.session();
    authSession
        .run(authQuery)
        .then((result) => {
            var dbPassword = result.records[0].get('password');
            var isUserAuthenticated = bcrypt.compareSync(password, dbPassword)
            if(isUserAuthenticated){
                userInfo.userId = result.records[0].get('userId');
                userInfo.name = result.records[0].get('name');
                userInfo.userName = result.records[0].get('emailId');
                const token= jwt.sign(
                    userInfo,
                    "secret key of todo",
                    {expiresIn: '2h'}
                );
                console.log("token::", token);
                authSession.close();
                res.status(200).json({
                    statusCode: 1,
                    message: "Success",
                    userId:userInfo.userId,
                    token: token,
                    expiresIn: 7200
                });

            }
            else{
                console.log("Unauthorized Access");
                res.status(403).json({
                    statusCode:0,
                    message:"Authenication Failed"
                })
            }
        }
        )
        .catch((error) => {
            console.log(error);
            authSession.close();

        })
}

exports.createUser =  (req, res, next)=> {
    console.log("INSIDE REGISTER SERVICE");
    var fullName = req.body.fullName;
    // var userName = req.body.userName;
    var emailId = req.body.emailId;
    var password = req.body.password;
    // console.log("userName::", userName);
    console.log("emailId::", emailId);
    // console.log("password::", password);

    bcrypt.hash(req.body.password,10)
    .then(hash=>{
    // var registerQuery = `CREATE (p:Person{id:apoc.create.uuid(), name:"${name}", userName: '${userName}', password: '${hash}'})
    // CREATE (t1:Tag{name:"new", statusCode:0, orderArray:" "}),
    //         (t2:Tag{name:"inProgress", statusCode:1, orderArray:" "}), 
    //         (t3:Tag{name:"done", statusCode:2, orderArray:" "}) WITH  p,t1, t2, t3
    // CREATE  (p)-[:HAS_TAG]->(t1), 
    //         (p)-[:HAS_TAG]->(t2), 
    //         (p)-[:HAS_TAG]->(t3)
    //         RETURN  p.id as userId, p.name as name, p.userName as userName`;

    var registerQuery = `CREATE (p:Person{id:apoc.create.uuid(), name:"${fullName}", emailId: '${emailId}', password: '${hash}'})
            RETURN  p.id as userId, p.name as name, p.userName as userName`;

    console.log("Query::", registerQuery)

    var registerSession = driver.session();

        registerSession
            .run(registerQuery)
            .then(result => {
                user={};
                user.userId = result.records[0].get('userId');
                user.userName = result.records[0].get('userName');
                user.personName = result.records[0].get('name');
    
                res.status(200).json({
                    message: "Success",
                    statusCode: 1,
                    data: user
                })
            })
            .catch(error =>
                console.log(error)
            )
            .then(() =>
                registerSession.close()
            )
    })

}
