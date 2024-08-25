import { Request, Response } from "express";
import { Login, Logout, Register } from "./auth.service";
import { loginSchemaType, logoutSchemaType, registerSchemaType } from "./auth.schema";
import generateJwtToken from "./jwt/generate-jwt-token";



export async function postRegisterHandler(req:Request<{},{},registerSchemaType>,res:Response){
    const data = req.body;
      console.log({ data });
      const user = await Register(data);
      const jwt = generateJwtToken(user);
      return res.json({ user, jwt });

};
export async function postLoginHandler(req:Request<{},{},loginSchemaType>,res:Response){
    const data = req.body;
      const user = await Login(data);
      const jwt = generateJwtToken(user);
      return res.json({ user, jwt });

};
export async function postLogoutHandler(req:Request<{},{},logoutSchemaType>,res:Response){
    res.clearCookie("accessToken");
    res.sendStatus(200).json("User has logged out");
};