import { productModel } from "../models/products.js";

export default class Products {
    constructor(){
        console.log("working products with database")
    }

    getAll = async () =>{
        const products = await productModel.find().lean();
        return products;
    }
    

    save = async (prod) => {
        const resultAdd = await productModel.create(prod);
        return resultAdd;
    }

    update = async (id,props) => {
        const resultUpdate = await productModel.updateOne({_id:id},{$set:props})
        return resultUpdate;
    }

    delete = async (id) => {
        const resultDelete = await productModel.deleteOne({_id:id})
        return resultDelete;
    }

 
}