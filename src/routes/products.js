import {
    Router
} from "express";
import FileManager from "../model/FileManager.js";
import addProductValidator from "../middlewares/addProductValidator.js";
import __dirname from '../utils.js';


const productsRouter = Router();

const productsManager = new FileManager("./db/products.json");

productsRouter.get("/", async (req, res) => {
    const products = await productsManager.getsProducts();

    res.render('home',{products})
});

productsRouter.post("/products", addProductValidator, async (req, res) => {
    try {
        const element = req.body;
        const products = await productsManager.addElement(element);
        if(products){

            res.send("Producto Agregado!");
        }
       
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});

productsRouter.get("/realtimeproducts", async (req, res) => {

    res.render('realTimeProducts')
});


export default productsRouter;