const jwt =require("jsonwebtoken");
const JWT_SECRET = require("../config");
// Middleware for handling auth
import{ Request, Response, NextFunction } from 'express';
function adminMiddleware(req:Request, res:Response, next:NextFunction) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    if(req.headers.authorization){
        const token = req.headers.authorization;
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
        if(decodedValue.email){
            next();
        }
        else{
            res.status(403).json({
                 msg:"you are not authenticated"
            })
        }
    }
}

export default adminMiddleware;