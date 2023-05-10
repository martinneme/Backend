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

 
}