import { Products } from '../dao/factory.js';
import ProductsRepository from '../repositories/products.repository.js';


const productsRepository = new ProductsRepository(new Products());

export {
    productsRepository
}