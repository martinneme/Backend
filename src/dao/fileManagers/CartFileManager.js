import FileManager from "./FileManager.js";




export default class CartFileManager extends FileManager{

constructor(path){
    super(path);
}

async addProductToCart(cid,pid) {
    try {
        
      const content = await this.readFile();
      const contentText = await JSON.parse(content);
      let cart = contentText.find((element) => element.id === cid );
      if (!cart) {
        throw new Error()
      }
      const findInCart = cart.products.find(e=>{
        if(e.pid === pid){
            console.log("entro")
            e.quantity++
            return 1
        }}
        )
        if(findInCart === undefined){
            const prod = {"pid":pid,"quantity":1}
            cart.products.push(prod)
        }
      await this.writeFile(JSON.stringify(contentText))
     
   return cid;
     
    }catch(e){
 const myError = new Error(`El producto ${pid} no se pudo agregar al carrito ${cid}`);
        myError.details = {code: 404, message: `El producto ${pid} no se pudo agregar al carrito ${cid}`};
        throw myError
    }
  }

}

