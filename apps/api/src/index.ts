import express, {Request, Response} from "express";
import routes from "./routes";
const app=express();
const PORT=4000;
app.use(express.json())
// app.use(cors())

routes(app);
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})