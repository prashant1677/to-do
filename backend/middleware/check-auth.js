const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var bToken = req.headers.authorization;
    if(!bToken) return res.status(403).send('Unauthorized Access');

    try{
        console.log("Inside Middleware");
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,"secret key of todo");
        console.log("decoded::", decodedToken);
        req.userData = { userName: decodedToken.userName, userId: decodedToken.userId };
        next();
    }
    catch(error){
        console.log("Auth error occured");
        res.status(401).json({
            message:"Authentication Error!"
        })
    }
};