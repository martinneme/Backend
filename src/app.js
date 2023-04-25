import express from 'express';
import productsRouter from './routes/products.js'
import handlebars  from 'express-handlebars';
import __dirname from './utils.js';
import {Server as HTTPServer} from 'http'
import {Server as SocketServer} from 'socket.io'
import FileManager from './model/FileManager.js';


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

app.use('/',productsRouter)

socketServer.on('connection',async (socket) =>{
    console.log("socket conectado");



    socket.emit("SEND_PRODUCTS",await fileManager.getsProducts())


    socket.on("PRODUCT_ADDED",async(obj)=>{
        console.log("llego:"+obj)
       const res =  await fileManager.addElement(obj)
       console.log(res)
        socketServer.sockets.emit("ADD_PRODUCT",await fileManager.getsProducts())
      })
})


httpServer.listen(8080,()=>{
    console.log("Express Server listening on PORT 8080")
})