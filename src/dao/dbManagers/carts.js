import { cartsModel } from "../models/carts.js";
import ManagerDb from "./managerDb.js";

export default class Carts extends ManagerDb {
    constructor(){
        console.log("working products with database");
        super(cartsModel)
    }

    addProductToCart = async (idCart, pid) => {
        const cart = await cartsModel.findById(idCart);
      
        if (cart) {
          const productIndex = cart.products.findIndex(e => e.pid === pid);
      
          if (productIndex !== -1) {
                await cartsModel.findByIdAndUpdate(
                idCart,
                { $inc: { "products.$[elem].quantity": 1 } },
                {
                  arrayFilters: [{ "elem.pid": pid }]
               
                }
              );
              return "Producto incrementado"
          } else {
            const prod = { pid: pid, quantity: 1 };
            cart.products.push(prod);
            await cart.save();
            return "Producto agregado";
          }
        }
      
        return "Carrito no encontrado";
      };

    findCartById = async (idCart) => {
        const resultCart = await cartsModel.findById({_id:idCart}).lean()
        return resultCart
    }
   
}