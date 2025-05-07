import { Request, Response, Router } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
export const AuthService = Router();
const JWTKey = process.env.JWT_SECRET || "jsonsecret";

// JWT Token used for req/res handling and for middleware

const RegisterSchema = z.object({
     username : z.string(),
     password : z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
     email : z.string().email()
})
const LoginSchema = z.object({
     email : z.string().email(),
     password : z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),    
})

AuthService.post("/register",async (req : Request,res : Response)=>{
    try {
        type register = z.infer<typeof RegisterSchema>; 
        const result = RegisterSchema.safeParse(req.body);

        if(!result.success) {
            res.status(400).json({
                message: 'Invalid request body',
                errors: result.error.issues,
            })
        }

        const email = result.data?.email as string;
        console.log(result.data);

        // database insertion 
        // JWT header

        const token = jwt.sign(email,JWTKey);

       res.status(201).json({
        msg : "",
        token : token
       })
         
    }catch{
        res.status(500).json({
            msg : "Server error"
        })
    }
})
AuthService.post("/login",async (req : Request,res : Response)=>{
    
    try {
       type login = z.infer<typeof LoginSchema>

       const result = LoginSchema.safeParse(req.body);

       if(!result.success) {
        res.status(400).json({
            message: 'Invalid request body',
            errors: result.error.issues,
        })
    }

    const email = result.data?.email as string;
    console.log(result.data);

    // database insertion 
    // JWT header

    const token = jwt.sign(email,JWTKey);

       res.status(201).json({
        msg : ""
       })
         
    }catch{
        res.status(500).json({
            msg : "Server error"
        })
    }
})
AuthService.post("/logout",async (req : Request,res : Response)=>{
    try {

       // client side job needs to remove Authorization header for not getting logged in. 

       res.status(201).json({
        msg : ""
       })
         
    }catch{
        res.status(500).json({
            msg : "Server error"
        })
    }
})
