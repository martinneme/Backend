import { cartsModel } from "../models/carts.js";

export default class Carts {
    constructor(){
        console.log("working products with database")
    }

    getAll = async () =>{
        const carts = await cartsModel.find().lean();
        return carts;
    }
    

    save = async (cart) => {
        const resultAdd = await cartsModel.create(cart);
        return resultAdd;
    }

    update = async (id,prod) => {
        const resultAdd = await cartsModel.update({_id:id},);
        return resultAdd;
    }
}