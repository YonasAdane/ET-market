// export { auth as middleware } from "app/lib/auth";
import NextAuth from "next-auth"
import AuthConfiguration from "./lib/config/auth.config"
 
export const { auth: middleware } = NextAuth(AuthConfiguration)