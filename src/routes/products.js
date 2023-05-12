import {
    Router
} from "express";
import Products from "../dao/dbManagers/products.js";
import addProductValidator from "../middlewares/addProductValidator.js";
import __dirname from '../utils.js';


const productsRouter = Router();

const productsManager = new Products();

productsRouter.get("/", async (req, res) => {
    const products = await productsManager.getAll() ;

    res.render('home',{products})
});

// productsRouter.get("/", async (req, res) => {
//     try{
// const products = await productsManager.getAll();
//     res.send({status:'success',payload:products})
//     }catch(error){
//         res.status(400).send({status:'error',error})
//     }
    
// });



productsRouter.post("/", addProductValidator, async (req, res) => {
    try {
        const element = req.body;
        const products = await productsManager.save(element);
        if(products){

            res.send("Producto Agregado!");
        }
       
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});


productsRouter.put("/:id",async (req, res) => {
    try {
        const element = req.body;
        const id = req.params.id
        const products = await productsManager.update(id,element);
        res.json({status:'success', payload: products});
             
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

productsRouter.get("/realtimeproducts", async (req, res) => {

    res.render('realTimeProducts')
});


export default productsRouter;