import Router from './router.js';
import Carts from "../dao/dbManagers/carts.js";
import { findCart,createNewCart,addProductToCartById ,updateQuantityProdToCart,clearCartId,deleteProductToCartById,createNewPurchase} from '../controllers/cartsController.js';

const cartsManager = new Carts();

export default class CartsRouter extends Router {
    init() {

        this.get("/:id",['USER','ADMIN'], findCart);

        this.post("/",['USER'], createNewCart);

        this.post("/:id/products/:idprod",['USER'],addProductToCartById);

        this.post("/:cid/purchase",['USER'],createNewPurchase);

        this.put("/:id/update/products/:idprod",['USER'],updateQuantityProdToCart);

        this.delete("/:id",['USER'],clearCartId);

        this.delete("/:id/product/:pid",['USER'],deleteProductToCartById);
    }
}