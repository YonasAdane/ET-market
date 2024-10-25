import passport, { PassportStatic } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../common/prisma-config";
import * as argon2 from "argon2";
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET as string;
export default (passport: PassportStatic) => {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID as string,
    clientSecret: GOOGLE_CLIENT_SECRET as string,
    callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
    scope:["profile","email"]
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      console.log(profile);
      
      let user=await db.user.findUnique({where:{googleId:profile.id}})
      if(!user){
        user=await db.user.create({
          data:{ 
            username:profile.displayName,
            firstName: profile._json.given_name || "",
            lastName: profile._json.family_name || "",
            googleId:profile.id,
            avatar: profile.photos?.[0]?.value || "",
            email:profile.emails?.[0].value || ""
  
        }})
        
        return done(null,user)
      }else {
        return done(null, user);  
    }
    } 
    catch (error) {
      return done(error,false)
    }
  }
));
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async(email, password, done) => {
    try {
      const user=await db.user.findUnique({where:{email}});
      if(!user || !user.password){
        return done(null,false);
      }
        if (await argon2.verify(user.password, password)) { 
          return done(null, user);
        } 
        else {
          return done(null, false); 
        }
    } catch (error) {
      return done(error,false)
    }
 
     
  })
);
passport.serializeUser((user, done) => {
  console.log("serialize: ",user);
  
      done(null, user);
  });

passport.deserializeUser(async (user:any, done) => {
  const dbuser = await db.user.findFirst({ where: { id:user.id  } });
  return user ? done(null, dbuser) : done(null, null);
});
}

     
     