import {productsRepository} from '../repositories/index.js';


const getAllProducts = async (limit, page , query,sortValue) => {
return  await productsRepository.getAllProducts(limit, page , query,sortValue);

}

const findProductById =  async (id) => {
    return await productsRepository.findProductById(id);
}


const addProduct = async (product) => {
    return await productsRepository.addProduct(product);
}

const updateProductById = async(id,product) => {
    return await productsRepository.updateProductById(id,product);
}


const deleteProductById = async (id) => {
    return await productsRepository.deleteProductById(id);
}

export {
    getAllProducts,findProductById,addProduct,updateProductById,deleteProductById
}