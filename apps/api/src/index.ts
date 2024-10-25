import express, {Request, Response} from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
import {routes} from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { wrapAsyncRoutes } from "./middlewares/wrapAsyncRoutes";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { db } from "./common/prisma-config";
import expressSession from 'express-session';
import passportStrategy from "./utils/passport";
import passport from "passport";
const app=express();
passportStrategy(passport);
app.use(
    expressSession({
      cookie: {
       maxAge: 7 * 24 * 60 * 60 * 1000 
      },
      secret: process.env.SESSION_KEY as string,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
        db, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );
app.use(passport.initialize());
app.use(passport.session());
const PORT=process.env.PORT;
app.use(express.json())
app.use(cors())
app.use(helmet())
app.get("/",(req:Request,res:Response)=>{
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