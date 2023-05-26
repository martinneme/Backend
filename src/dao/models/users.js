import mongoose from "mongoose";
const userscollection = "users";
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    timestamp:{
        type: Date,
        default: Date.now
    },


});

export const comparePassword = async (password, hashedPassword) => {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Error al comparar las contraseñas');
    }
  };


export const usersModel = mongoose.model(userscollection,usersSchema);