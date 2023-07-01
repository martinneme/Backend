import Router from './router.js';
import Carts from "../dao/dbManagers/carts.js";
// import __dirname from '../utils.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {

        this.get("/:id",['USER','ADMIN'], async (req, res) => {
            try {
                const contentType = req.headers['content-type'];
                const id = req.params.id
                const cart = await cartsManager.findElementById(id);
                if (contentType === 'application/json') {
                    res.json(cart)
                } else {
                    res.render('cart', {
                        cart
                    })
                }
            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });

        this.post("/",['USER','ADMIN'], async (req, res) => {
            try {
                const cart = await cartsManager.save();
                if (cart) {
                    res.json({
                        status: 'success',
                        payload: cart._id
                    });
                }
            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });

        this.post("/:id/products/:idprod",['USER','ADMIN'], async (req, res) => {
            try {
                const idProd = req.params.idprod;
                const id = req.params.id
                const quantity = req.body.quantity

                const cart = await cartsManager.addProductToCart(id, idProd, quantity);
                if (cart) {
                    res.json({
                        status: 'success',
                        payload: cart
                    });
                }

            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });

        this.put("/:id",['USER','ADMIN'], async (req, res) => {
            try {
                const element = req.body;
                const id = req.params.id
                const cart = await cartsManager.update(id, element);
                res.json({
                    status: 'success',
                    payload: cart
                });
            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });

        this.put("/:id/update/products/:idprod",['USER','ADMIN'], async (req, res) => {
            try {
                const idProd = req.params.idprod;
                const id = req.params.id
                const quantity = req.body.quantity;
                const cart = await cartsManager.updateQuantityProdInCart(id, idProd, quantity);
                if (cart) {
                    res.json({
                        status: 'success'
                    })
                } else {
                    res.json({
                        status: 'failed'
                    });
                }

            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });


        this.delete("/:id",['USER','ADMIN'], async (req, res) => {
            try {
                const id = req.params.id
                const cart = await cartsManager.clearCart(id);
                if (cart) {
                    res.json({
                        status: 'success',
                        payload: cart
                    });
                } else {
                    throw cart
                }
            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });

        this.delete("/:id/product/:pid",['USER','ADMIN'], async (req, res) => {
            try {
                const id = req.params.id
                const pid = req.params.pid
                const cart = await cartsManager.deleteProductByID(id, pid);
                if (cart !== -1) {
                    res.json({
                        status: 'success',
                        payload: cart
                    });
                } else {
                    throw cart
                }

            } catch (error) {
                res.status(400).json({
                    error: error
                });
            }
        });
    }
}