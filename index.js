import ProductManager from './class/ProductManager.js';

const productos = new ProductManager();

//Muestra productos Array vacio
productos.getProducts()

//Se agregan productos
productos.addProducts("Mate","Con bombilla",1547,"http://image.com",1254,4);
productos.addProducts("Yerba","Playadito",150,"http://image.com",1251,24);

//se muestra producto con cada elemento con su id y code unico.
productos.getProducts()

//se agrega un producto repetido - code duplicado - 
productos.addProducts("Yerba","Playadito",150,"http://image.com",1251,24);

//se pide el producto por id existente
productos.getProductById(1);


//se pide el producto por id  inexistente existente
productos.getProductById(4);

