import {
    Router
} from "express";
import FileManager from "../model/FileManager.js";
import CartFileManager from "../model/CartFileManager.js";


const cartRouter = Router();

const cartManager = new FileManager("./db/cart.json");
const cartFileManager = new CartFileManager("./db/cart.json");

cartRouter.post("/", async (req, res) => {
    try {
        const element ={"products":[]}
        const cart = await cartFileManager.addElement(element);
        res.send(`Carrito creado id:${cart}`);
    } catch (error) {
        res.status(400).send().json({
            error: error
        });
    }
});

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const productCart = await cartFileManager.getProductById(cid);
        res.send(productCart);
    } catch (error) {
        res.status(404).send(error);
    }
});


cartRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const cart = await cartFileManager.addProductToCart(cid,pid);
        res.send(`producto agregado al carrito id:${cart}`);
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
});

export default cartRouter;