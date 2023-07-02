import Router from './router.js';


export default class SessionsViews extends Router {
    init() {
        
        this.get("/register",['PUBLIC'], async (req, res) => {
            res.render('register')
          
         });

         this.get("/login", ['PUBLIC'], async (req, res) => {
            res.render('login')
         });
       
       
         this.get("/", ['USER','ADMIN'], async (req, res) => {
            res.render('profile',({
               user:req.user
            }))
         });

    }

}