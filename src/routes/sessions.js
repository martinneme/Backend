import { Router } from "express";
import Users from "../dao/dbManagers/users.js";
import __dirname from "../utils.js";
import passport from 'passport';
const sessionsRouter = Router();

const usersManager = new Users();

sessionsRouter.post("/register", passport.authenticate('register', { failureRedirect: '/' }), async (req, res) => {
  res.send({ status: 'success', message: 'User registered' })
});


sessionsRouter.post("/login",  passport.authenticate('login', { failureRedirect: 'fail-login' }),async (req, res) => {
  if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });

  let admin = req?.user?.email === 'adminCoder@coder.com' ? true : false;

    req.session.user = {
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      age: req.user.age,
      isAdmin:admin
    };

    res.send({
        status: "Success",
        autorizated: true
      });

});

sessionsRouter.get('/github',passport.authenticate('github',{scope:['user:email']}),async (req,res)=>{
  res.send({
    status: "Success",
    autorizated: true
  });
})

sessionsRouter.get('/github-callback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
  if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  let admin = req?.user?.email === 'adminCoder@coder.com' ? true : false;

  req.session.user = {
    name: `${req.user.firstName} ${req.user.lastName}`,
    email: req.user.email,
    age: req.user.age,
    isAdmin:admin
  };

  res.redirect("/products")
})


sessionsRouter.get("/logout", async (req, res) => {
  let result;
  await req.session.destroy((err) => {
    if (err) {
      console.log("Error al destruir la sesión:", err);
      return res.status(400).send({
        status: "Error",
        logout: false
      });
    } else {
      console.log("Sesión destruida correctamente");
      return res.send({
        status: "Success",
        logout: true
      })
    }});



return  result
  });

export default sessionsRouter;
