import { NextFunction, Request, Response } from "express";
import {  Logout, Register } from "./auth.service";
import { registerSchemaType } from "./auth.schema";
const CLIENT_URL=process.env.CLIENT_URL as string;


export async function postRegisterHandler(req:Request<{},{},registerSchemaType>,res:Response){
    const data = req.body;
      console.log({ data });
      const user = await Register(data);
      return res.json({ 
        username:user.username,
        email:user.email,
        avatar:user.avatar});

};
export async function postLoginHandler(req:Request,res:Response){
  return res.sendStatus(200)
};
// export async function postLogoutHandler(req:Request<{},{},logoutSchemaType>,res:Response){
//   req.logout()
//   return res.redirect(CLIENT_URL);
// };
export async function logoutHandler(req:any,res:Response){
  req.logout()
  return res.redirect(CLIENT_URL);
  }