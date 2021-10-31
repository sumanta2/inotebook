const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagood$boy'

const fetchuser = (req, res, next) => {      //fetchuser is a user defined middleware so it get three argument req,res and next

    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)    //it get the token(like session/cookies in php) from client which provided in logged-in time and verify this
    req.user = data.user;
    next(); //it call the next function of this middleware where this middleware will call
    }
    catch(err)
    {
        res.status(401).send({ error: "please authenticate using a valid token" })

    }
    
}

module.exports = fetchuser
