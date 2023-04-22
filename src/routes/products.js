import {
    Router
} from "express";
import FileManager from "../model/FileManager.js";
import addProductValidator from "../middlewares/addProductValidator.js";

const productsRouter = Router();

const productsManager = new FileManager("./db/products.json");

productsRouter.get("/", async (req, res) => {
    const products = await productsManager.getsProducts();

    res.render('home',{products})
});

productsRouter.post("/", addProductValidator, async (req, res) => {
    try {
        const element = req.body;
        const products = await productsManager.addElement(element);
        if(products){
            res.send(`Producto agregado id:${products}`); 
        }
       
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});




// // productsRouter.get("/:pid", async (req, res) => {
// //     try {
// //         const pid = parseInt(req.params.pid);
// //         const product = await productsManager.getProductById(pid);
// //         res.send(product);
// //     } catch (error) {
// //         res.status(404).send(error);
// //     }
// // });



// productsRouter.put("/:pid", async (req, res) => {
//     try {
//         const pid = parseInt(req.params.pid);
//         const elements = req.body;
//         const products = await productsManager.update(pid,elements);
//         res.send(products);
//     } catch (error) {
//         res.status(error.details.code   ).json(error);
//     }
// });

// productsRouter.delete("/:pid", async (req, res) => {
//     try {
//         const pid = parseInt(req.params.pid);
//         const products = await productsManager.delete(pid);
//         res.send(products);
//     } catch (error) {
//         res.status(error.details.code).json(error);
//     }
// });


export default productsRouter;