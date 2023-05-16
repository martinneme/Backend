import { productModel } from "../models/products.js";
import ManagerDb from "./managerDb.js";

export default class Products extends ManagerDb{
    constructor(){
    super(productModel)
    }

 
}