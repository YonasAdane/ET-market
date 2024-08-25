import express, {Request, Response} from "express";
import {routes} from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { wrapAsyncRoutes } from "./middlewares/wrapAsyncRoutes";
const app=express();
const PORT=4000;
app.use(express.json())
// app.use(cors())
app.use("/", wrapAsyncRoutes(routes)); // Automatically wraps all routes with asyncHandler
// routes(app);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})