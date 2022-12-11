const Jwt = require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    token = req.headers?.authorization.split(" ")[1];
    console.log(token);
    if(token){
        const decoded = Jwt.verify(token, 'hush');
        console.log(decoded);
        if(decoded){
            const userID = decoded.User_id
            req.body.userId = userID;
            next()
        }
        else{
            res.send("Please login")
        }  
    }
    else{
        res.send("Please login")
    }
}

module.exports ={
    authenticate
}