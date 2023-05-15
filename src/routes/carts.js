import {
    Router
} from "express";
import Carts from "../dao/dbManagers/carts.js";
import __dirname from '../utils.js';


const cartsRouter = Router();

const cartsManager = new Carts();


cartsRouter.get("/", async (req, res) => {
    try{
const carts = await cartsManager.getAll();
    res.send({status:'success',payload:carts})
    }catch(error){
        res.status(400).send({status:'error',error})
    }
    
});

cartsRouter.get("/:id",async (req, res) => {
    try {
        const id = req.params.id
        const cart = await cartsManager.findCartById(id);
        res.json({status:'success', payload: cart});
             
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});



cartsRouter.post("/",async (req, res) => {
    try {
     
        const cart = await cartsManager.save();
        if(cart){

            res.send(`Se ha creado el carrito!: `+cart._id);
        }
       
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

cartsRouter.post("/:id/products/:idprod",async (req, res) => {
    try {
        const idProd = req.params.idprod;
        const id = req.params.id
        const cart = await cartsManager.addProductToCart(id,idProd);
        if(cart){
            console.log(cart)
            res.send(`Se agrego el producto ${idProd} al carrito ${id}`);
        }
       
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

cartsRouter.put("/:id",async (req, res) => {
    try {
        const element = req.body;
        const id = req.params.id
        const cart = await cartsManager.update(id,element);
        res.json({status:'success', payload: cart});
             
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});




export default cartsRouter;