import FileManager from "./Class/productManager.js";

////////////
// Se creará una instancia de la clase “ProductManager”
const nuevoArchivo = new FileManager('./nuevoArchivo.txt')
////////////

////////////
//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
await nuevoArchivo.getsProducts()
////////////

////////////
// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25
await nuevoArchivo.addProduct({title:"producto prueba”",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",code:"abc123",stock:25});
///////////

///////////
// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
await nuevoArchivo.getsProducts()   
////////////

////////////
// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
await nuevoArchivo.getProductById(0)
////////////

////////////
// Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id 
//y que sí se haya hecho la actualización.
await nuevoArchivo.updateProduct(0,{stock:78,description:"test update"})
////////////

////////////
// Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
await nuevoArchivo.deleteProduct(0)
////////////