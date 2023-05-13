import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js';
import messagesRouter from './routes/messages.js'
import handlebars  from 'express-handlebars';
import __dirname from './utils.js';
import {Server as HTTPServer} from 'http'
import {Server as SocketServer} from 'socket.io'
import FileManager from './dao/fileManagers/FileManager.js';
import mongoose from 'mongoose';


const fileManager = new FileManager("./db/products.json");

const app = express();
const httpServer = new HTTPServer(app);
export const socketServer = new SocketServer(httpServer);
export  const io = socketServer; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/products/',express.static(`${__dirname}/public`));
app.use('/products/realTimeProducts/',express.static(`${__dirname}/public`));
app.use('/chat/',express.static(`${__dirname}/public`));
app.use('/carts/',express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views` ); 
app.set('view engine',`handlebars` ); 

app.use('/products',productsRouter)
app.use('/carts',cartsRouter)
app.use('/chat',messagesRouter)


try{
await mongoose.connect('mongodb+srv://mnmongodb:dbpass07@dbmongoazure.nrqqfgp.mongodb.net/ecommerce')
}catch(error){
console.log("error conecction db");
}

socketServer.on('connection',async (socket) =>{
    console.log("socket conectado");

    socket.emit("SEND_PRODUCTS",await fileManager.getsProducts())


    socket.on("PRODUCT_ADDED",async(obj)=>{
        obj.thumbnails= [obj.thumbnails];
        console.log("se ejecuto")
       await fileManager.addElement(obj)
        socketServer.sockets.emit("ADD_PRODUCT",obj)
      })


      socket.on("PRODUCT_DELETE",async(id)=>{
       const idProduct = parseInt(id)
        await fileManager.delete(idProduct);
        socketServer.sockets.emit("PRODUCT_DELETED",idProduct)
      })
})


httpServer.listen(8080,()=>{
    console.log("Express Server listening on PORT 8080")
})  