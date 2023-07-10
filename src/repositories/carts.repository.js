import Carts from '../dao/dbManagers/carts.js';

export default class CartsRepository {
    constructor() {
        this.dao = new Carts();
    }

    findCartById = async (id) => {
        return await this.dao.findElementById(id);
    }


    createCart = async () => {
        return await this.dao.save();
    }


    addProdToCart = async (idCart, idProd, quantity) => {
        return await this.dao.addProductToCart(idCart, idProd, quantity)
    }

    updateProdQuantityInCart = async (idCart, pid, quantity) => {
        return await this.dao.updateQuantityProdInCart(idCart, pid, quantity);
    }


    ClearCartById = async (idCart) => {
        return await this.dao.clearCart(idCart);
    }

    deleteProdInCart = async (idCart, pid) => {
        return await this.dao.deleteProductByID(idCart, pid)
    }

}