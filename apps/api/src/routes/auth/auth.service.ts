import { BaseError } from "../../utils/baseError";
import { db } from "../../common/prisma-config";
import { loginSchemaType, logoutSchemaType, registerSchemaType } from "./auth.schema";
import * as argon2 from 'argon2';

// export async function Login(data:loginSchemaType){
//     const user = await db.user.findFirst({
//         where: {
//           email: data.email,
//         },
//       });
    
//       if (!user) {
//         throw new BaseError('User not found', 404);
//       }
    
//       const valid = await argon2.verify(user.password, data.password);
    
//       if (!valid) {
//         throw new BaseError('Invalid password', 401);
//       }
    
//       return user;
// }
export async function Logout(uid:logoutSchemaType){

}
export async function Register(data:registerSchemaType){
    const userExist = await db.user.findFirst({
        where: {
          email: data.email,
        },
      });
    
      if (userExist) {
        throw new BaseError('User already exist with this Email', 409);
      }
    
      const hash = await argon2.hash(data.password);
      const user = await db.user.create({
        data:{...data,password:hash},
      });
      console.log("created user :==",user);
      
    
      return user;
}






export async function findUserById(id:number) {
  const user = await db.user.findFirst({
    where: { id },
  });

  if (!user) {
    throw new BaseError('User not found', 404);
  }

  return user;
}
