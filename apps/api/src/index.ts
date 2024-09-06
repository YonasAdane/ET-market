import express, {Request, Response} from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
import {routes} from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { wrapAsyncRoutes } from "./middlewares/wrapAsyncRoutes";
const app=express();
const PORT=process.env.PORT;
app.use(express.json())
app.use(cors())
app.use(helmet())
app.get("/",(req,res)=>{
    res.json({message:"welcome to et-market"})
})
app.use("/api/v1", wrapAsyncRoutes(routes));
app.all('*', (req:Request, res:Response) => {
    res.status(404).json({message:"page not found"})
});
// routes(app);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})
export default app;