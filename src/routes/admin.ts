import express, { Request,Response} from "express";
import adminMiddleware from "../middleware/admin"
const router = express.Router();
import jwt from "jsonwebtoken"
import prisma from "../db/index"
import { error } from "console";


const JWT_SECRET = require("../config");


router.post('/signin',async(req:Request,res:Response)=>{
    const email = req.body.email;
    const password = req.body.password;
    const phonenumber = req.body.phonenumber;
    const user = await prisma.admins.findFirst({
        where:{
            email:email
        }
    })
    if(user){
        const token = jwt.sign({
            email
        },JWT_SECRET);
        res.json({
            token
        })
    }
    else{
        res.status(411).json({
            message:"Incorrect email and pass"
        })
    }

});
router.post('/issue', adminMiddleware, async(req:Request, res:Response) => {
    // Implement course creation logic

        console.log(req.body)
        const department = req.body.department;
        const issue = req.body.issue;
        const labno = req.body.labno;
        const status = req.body.status;
        const description =req.body.description;
        const newIssue = await prisma.issues.create({
          data:{
              department,
              issue,
              labno,
              status,
              description
          }
        })
        if(newIssue){
            res.json({
                newIssue
            })
        }
        else{
            res.status(411).json({
                message:"Incorrect request"
            })
        }
    
    
});
router.get('/showIssue', async(req:Request,res:Response) => {

    const response = await prisma.issues.findMany({});
    console.log(response);
    res.json({
        issue: response
    })
})
router.delete('/deleteIssue', adminMiddleware, async (req:Request, res:Response) => {
    

    const id = Number (req.query.id);
    const department = String (req.query.department);
    const labno = Number (req.query.labno)
    console.log(req.query)
    const response = await prisma.issues.deleteMany({
        where:{
            id:id,
            department:department,
            labno:labno
        }

    })
    res.json({
        issue: response
    })

})
export default router;