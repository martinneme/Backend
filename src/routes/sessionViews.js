import Router from './router.js';
import {  registrer,login,profile } from '../controllers/sessionsViewsController.js';

export default class SessionsViews extends Router {
    init() {
        
        this.get("/register",['PUBLIC'],registrer);

         this.get("/login", ['PUBLIC'],login);
       
       
         this.get("/", ['USER','ADMIN'],profile);

    }

}