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


    addProductToCart = async (idCart, idProd) => {
      const rs = await this.model.findOneAndUpdate(
        { _id: idCart, "products.product": idProd },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );
    
      if (rs) {
        return 2; 
      } else {
        const prod = { product: idProd, quantity: 1 };
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
      }
    };

      updateQuantityProdInCart = async (idCart, pid,quantity) => {
       
        const cart = await this.model.findById(idCart);
      
        if (cart) {
          const productIndex = cart.products.findIndex(e => e.pid === pid);
      
          if (productIndex !== -1) {
                await this.model.findByIdAndUpdate(
                idCart,
                { $set: { "products.$[elem].quantity": quantity } },
                {
                  arrayFilters: [{ "elem.pid": pid }]
               
                }
              );
              return "quantity actualizada"
          } else {
            const prod = { pid: pid, quantity: 1 };
            cart.products.push(prod);
            await cart.save();
            return "Producto agregado";
          }
        }
      
        return "Carrito no encontrado";
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