import { Products,Carts,Sessions,Messages } from '../dao/factory.js';
import ProductsRepository from '../repositories/products.repository.js';
import CartsRepository from '../repositories/carts.repository.js';
import SessionsRepository from './sessions.repository.js';
import MessagesRepository from './messages.repository.js';


const productsRepository = new ProductsRepository(Products);
const cartsRepository = new CartsRepository(Carts);
const sessionsRepository = new SessionsRepository(Sessions)
const messagesRepository = new MessagesRepository(Messages)

export {
    productsRepository,cartsRepository,sessionsRepository,messagesRepository
}