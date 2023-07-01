import passport from 'passport'
import jwt from 'passport-jwt'



const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const passportInit = () => {
passport.use('jwt',new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey:'MartinNeme'
},async(jwt_payload,done)=>{
    try{
        const user = jwt_payload.user
        return done(null,user)
    }catch(error){
        return done(error)
    }
}))

}

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies['coderCookieToken']
    }
return token;
}


export default passportInit;