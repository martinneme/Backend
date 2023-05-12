import express from 'express';
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js';
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
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views` ); 
app.set('view engine',`handlebars` ); 

app.use('/products',productsRouter)
app.use('/carts',cartsRouter)


try{
await mongoose.connect('mongodb+srv://mnmongodb:dbpass07@dbmongoazure.nrqqfgp.mongodb.net/ecommerce')
}catch(error){
console.log("error conecction db");
}

app.listen(8080,()=>{
    console.log("Express Server listening on PORT 8080")
})