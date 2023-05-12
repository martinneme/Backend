import { messagesModel } from "../models/messages.js";

export default class Messages {
    constructor(){
        console.log("working messages with database")
    }

    getAll = async () =>{
        const products = await messagesModel.find({}, null, { sort: { timestamp: 1 } }).lean();
        return products;
    }
    

    save = async (message) => {
      
        const resultAdd = await messagesModel.create(message);
        return resultAdd;
    }


    update = async (id,props) => {
        const resultUpdate = await messagesModel.updateOne({_id:id},{$set:props})
        return resultUpdate;
    }

 
}