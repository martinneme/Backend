import {
    Router
} from "express";
import FileManager from "../model/FileManager.js";
import addProductValidator from "../middlewares/addProductValidator.js";

const productsRouter = Router();

const productsManager = new FileManager("./db/products.json");

productsRouter.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = await productsManager.getsProducts();
    res.send(limit ? products.slice(0, limit) : products);
});

productsRouter.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productsManager.getProductById(pid);
        res.send(product);
    } catch (error) {
        res.status(404).send(error);
    }
});

productsRouter.post("/", addProductValidator, async (req, res) => {
    try {
        const element = req.body;
        const products = await productsManager.addElement(element);
        res.send(`Producto agregado id:${products}`);
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});

productsRouter.put("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const elements = req.body;
        const products = await productsManager.update(pid,elements);
        res.send(products);
    } catch (error) {
        res.status(error.details.code   ).json(error);
    }
});

productsRouter.delete("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const products = await productsManager.delete(pid);
        res.send(products);
    } catch (error) {
        res.status(error.details.code).json(error);
    }
});


export default productsRouter;