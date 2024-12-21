import express, { Request,Response } from "express";
import prisma from "./index";
const router = express.Router();

router.get('/', async(req:Request,res:Response) => {

    const response = await prisma.issues.findMany({});
    
})
router.get('/numIssue', async(req:Request,res:Response) => {

    
    const response = await prisma.issues.count()
    
    res.json(response)

})
router.get('/depnumIssue', async(req:Request,res:Response) => {
    
    const department = String (req.query.department);
    const response = await prisma.issues.count({
        where:{
            department:department
        }
    })
    
    res.json(response)

})
router.get('/labIssue', async(req:Request,res:Response) => {

    const department = String (req.query.department);
    const labno =  Number(req.query.labno);
    const response = await prisma.issues.findMany({
        where:{
            department:department,
            labno:labno
        }
    })
    
    res.json(response)

})
export default router;