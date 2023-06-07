import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import Users from "../dao/dbManagers/users.js";
import { comparePassword ,createPasswordHash} from "../utils.js";

const usersManager = new Users();

const localStrategy = local.Strategy;

const passportInit = () => {

    passport.use('github', new GitHubStrategy({
        clientID:"Iv1.e11f7ba8bbcb5dcd",
    clientSecret:"5b7cf790f678de53c9caf5faca075656f269000b",
    callBackURL:'http://localhost:8080/api/sessions/github-callback',
    scope:['user:email']
    },async (accessToken,refreshToken,profile,done)=>{
        try{
            const username = profile.emails[0].value;
            const user = await usersManager.findIfExist(username)

            if (!user){
                const newUser = {
                    firstName: profile._json.name,
                    lastName: profile._json.login,
                    email:username,
                    password: await createPasswordHash("user123") ,
                    isAdmin:false
                }

                const saveNewUser = await usersManager.save(newUser)
                console.log(saveNewUser)
                done(null, saveNewUser);
            }else{

                done(null,user)
            }
    
    
        }catch(error){
            return done(error)
        }
    }))




passport.use('/register',new localStrategy({
    passReqToCallback:true,
    usernameField:'email'
},async (req,username,password,done)=>{
console.log("password:"+password)
    try {
        const { firstName, lastName, email } = req.body;
        
        const exist = await usersManager.findIfExist(username)
    
        if (exist)return done(null,false);
    
        const user = {
          firstName,
          lastName,
          email,
          password: await createPasswordHash(password)
        };
    
     const newUser = await usersManager.save(user)
    
        return done(null,newUser)
      } catch (error) {
        return done(`Error al obtener el usuario:${error}`);
      }

}))

passport.use('/login', new localStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await usersManager.LoginValidate(username,password);

        if (!user) {
            return done(null, false)
        }

        return done(null, user)


    } catch (error) {
        return done(`Error al obtener el usario: ${error}`)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersManager.findById(id);
    done(null, user);
});
}

export default passportInit;