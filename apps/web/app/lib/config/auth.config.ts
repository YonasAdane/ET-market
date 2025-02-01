import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { getUserFromDb } from "../auth/action"
import { signInSchema } from "../types/user"
const AuthConfiguration:Omit<NextAuthConfig,"Adapter">= {
  providers: [Google,
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password"
        },
      },
      
      async authorize (credentials,req)  {
        try {
          let user = null

          const { email, password } = signInSchema.parse(credentials)
          user = await getUserFromDb(email, password)
          return {...user,role:user?.role}
        } catch (error) {
            return null
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
        console.log("session callback: ", { session, token });
    
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,   // Ensure the user ID is included
            role: token.role // Add role to session
          }
        }
    },
    jwt:( {token,user }) =>{
        const u=user as unknown as any
      if (user) {
        token.role = u.role;
      }
      console.log("JWT callback token: ",token);
      console.log("JWT callback user: ",user);
      
      return token;
    },
  },
 
//   pages: {
//     signIn: "/login",
//   }
}   satisfies Omit<NextAuthConfig,"Adapter">;
export default AuthConfiguration;