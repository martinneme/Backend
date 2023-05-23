import { cartsModel } from "../models/carts.js";
import ManagerDb from "./managerDb.js";


export default class Carts extends ManagerDb {
    constructor(){
        console.log("working products with database");
        super(cartsModel)
    }

    save = async () => {
      return this.model.create({})
    }

    getAll = async () => {
      const resultAll = await this.model.find().populate('products.product').lean();
    return resultAll
    }


    addProductToCart = async (idCart, idProd,quantity) => {
        const prod = { product: idProd, quantity: quantity };
        const updatedCart = await this.model.findByIdAndUpdate(
          idCart,
          { $push: { products: prod } },
          { new: true }
        );
    
        if (updatedCart) {
          return 1; 
        } else {
          return 0; 
        }
      
    };

      updateQuantityProdInCart = async (idCart, pid,quantity) => {
       
        const cart = await this.model.findOne({
          _id: idCart,
          "products.product": pid
        });

        if(cart){
           const update = { $inc: { "products.$[elem].quantity": quantity } };
        const options = { arrayFilters: [{ "elem.product": pid }] };
      
        const updatedCart = await this.model.findByIdAndUpdate(idCart, update, options);
        if (updatedCart) {
          return 1;
        }
        }else{
          return 0;
        }

       
   
          
     
      };


      clearCart = async (idCart) => {
        await this.model.findByIdAndUpdate(
          idCart,
          { $set: { "products": [] } },
          
        );

        return 'Se ha vaciado el carrito'

      }



      deleteProductByID = async (id,pid) =>{ 

        const cart = await this.model.findById({_id:id})
        const productIndex = cart.products.findIndex(e => e.pid === pid);
   
        if(productIndex !== -1 ){
            cart.products.splice(productIndex, 1);
            cart.save();
            return cart
        }else{
            return -1
        }


      }
   
}