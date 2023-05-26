import {
    Router
} from "express";
import Messages from "../dao/dbManagers/messages.js";
import __dirname from '../utils.js';


const messagesRouter = Router();

const messagesManager = new Messages();

messagesRouter.get("/", async (req, res) => {
    const messages = await messagesManager.getAll();
    res.render('chat',{messages})
});



messagesRouter.post("/", async (req, res) => {
    try {
        const element = req.body;
        const products = await messagesManager.save(element);
        if(products){

            res.send("Mensaje Agregado!");
        }
       
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});



export default messagesRouter;