
import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(2).max(100),
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
    email:z.string().email(),
    password:z.string(),
});

export const loginSchema = z.object({
    email:z.string().email(),
    password:z.string(),
  });

export const logoutSchema = z.object({
    userId:z.string()
  });
export type registerSchemaType=z.infer<typeof registerSchema>;
export type loginSchemaType=z.infer<typeof loginSchema>;
export type logoutSchemaType=z.infer<typeof logoutSchema>;

export enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN", 
}

export interface User {
  id: number;                  
  username: string;           
  email: string;              
  password?: string;          
  role: Role;                 
  firstName?: string;        
  lastName?: string;         
  phoneNumber?: string;      
  address?: string;          
  avatar?: string;           
  googleId?: string;         
  createdAt: Date;           
}