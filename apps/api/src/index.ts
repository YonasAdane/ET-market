import express, {Request, Response} from "express";
const app=express();
const PORT=4000;
app.use(express.json())
// app.use(cors)
app.use("/",(req:Request,res:Response)=>{
    res.send("dsf");
})
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})