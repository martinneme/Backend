import CartsRepository from '../repositories/carts.repository.js';

const cartsRepository = new CartsRepository();


const findCartById =  async (id) => {
    return await cartsRepository.findCartById(id);
}


const createCart = async () => {
    return await cartsRepository.createCart();
}


const addProdToCart = async (idCart, idProd,quantity) =>{
    return await cartsRepository.addProdToCart(idCart, idProd,quantity)
}

const updateProdQuantityInCart = async(idCart, pid,quantity) => {
    return await cartsRepository.updateProdQuantityInCart(idCart, pid,quantity);
}


const ClearCartById = async (idCart) => {
    return await cartsRepository.ClearCartById(idCart);
}

const deleteProdInCart = async (idCart,pid) => {
    return await cartsRepository.deleteProdInCart(idCart,pid)
}

export {
    findCartById,createCart,addProdToCart,updateProdQuantityInCart,ClearCartById,deleteProdInCart
}