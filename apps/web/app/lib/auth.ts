import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthResult } from "next-auth"
import AuthConfiguration from "./config/auth.config"
import { db } from "./config/prisma-config"
const authConfig = NextAuth({
  adapter: PrismaAdapter(db),
  ...AuthConfiguration
})  

export const auth: NextAuthResult["auth"] = authConfig.auth
export const handlers: NextAuthResult["handlers"] = authConfig.handlers
export const signIn: NextAuthResult["signIn"] = authConfig.signIn
export const signOut: NextAuthResult["signOut"] = authConfig.signOut
