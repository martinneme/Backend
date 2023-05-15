import { cartsModel } from "../models/carts.js";
import ManagerDb from "./managerDb.js";

export default class Carts extends ManagerDb {
    constructor(){
        console.log("working products with database");
        super(cartsModel)
    }

    addProductToCart = async (idCart,idProd) =>{
        const cart = await cartsModel.findById({_id:idCart});
        cart.products.push(idProd)
        const response = cart.save()
        return response;
    }

    findCartById = async (idCart) => {
        const resultCart = await cartsModel.findById({_id:idCart}).lean()
        return resultCart
    }
   
}