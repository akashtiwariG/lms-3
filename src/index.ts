import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import prisma from "./db";
import * as dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(cors());

import adminRouter from "./routes/admin"
import administratorRouter from "./routes/administrator"
import issueRouter from "./db/issue"
const axios = require('axios');
// Middleware for parsing request bodies
app.use(bodyParser.json());



app.use("/admin", adminRouter)
app.use("/administrator", administratorRouter)
app.use("/issue",issueRouter)

async function createAdministrator(id:number,email:string,password:string,phonenumber:number,status:string) {
    const res = await prisma.administrators.create({
        data:{
            id,
            email,
            password,
            phonenumber,
            status
        }
    })
    console.log(res);
}

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});