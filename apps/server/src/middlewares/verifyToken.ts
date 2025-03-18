import jwt from "jsonwebtoken";
import apiError from "../helpers/apiError";



export const verifyToken = async (req: any, res: any, next: any) => {

    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        throw new apiError(401, "Access Denied");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!);
        if(verified){
            req.user = verified;
            console.log("User", req.user);
            next();
        }     
    } catch (error) {
        console.log("Error", error);
        throw new apiError(401, "Invalid Token");
    }
};