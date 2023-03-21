export default class ProductManager {
  constructor() {
    this.products = [];
    this.nextID = 0;
  }

  addProducts(title, description, price, thumbnail, code, stock){
    if (title && description && price && thumbnail && code && stock) {
      if (this.products.find((product) => product.code === code)) {
        console.error("Ya existe un producto con ese codigo");
        return;
      }

      const product = {
        id: this.nextID,
        title: title,
        description: description,
        price: price || 0,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(product);
      this.nextID++;
    }else{
        console.error("No contiene las propiedades requeridas")
    }
  }

getProducts(){
console.log(this.products);
}

getProductById(id) {
    let product = this.products.find((product) => product.id === id);
    if (!product) {
      product="Not found"
    }
    return console.log(product);
  }



}
