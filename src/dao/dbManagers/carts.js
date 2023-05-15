import { cartsModel } from "../models/carts.js";

export default class Carts {
    constructor(){
        console.log("working products with database")
    }

    getAll = async () =>{
        const carts = await cartsModel.find().lean();
        return carts;
    }
    

    create = async (cart) => {
        const resultAdd = await cartsModel.create(cart);
        return resultAdd;
    }

    addProductToCart = async (idCart,idProd) =>{
        const cart = await cartsModel.findById({_id:idCart});
        cart.products.push(idProd)
        const response = cart.save()
        return response;
    }

    update = async (id,prod) => {
        const resultAdd = await cartsModel.update({_id:id},{$set:prod});
        return resultAdd;
    }

    findCartById = async (idCart) => {
        const resultCart = await cartsModel.findById({_id:idCart}).lean()
        return resultCart
    }

    delete = async (id) => {
        const resultUpdate = await productModel.deleteOne({_id:id})
        return resultUpdate;
    }

    delete = async (id) => {
        const resultDelete = await productModel.deleteOne({_id:id})
        return resultDelete;
    }

   
}