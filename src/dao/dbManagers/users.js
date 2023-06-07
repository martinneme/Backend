import { usersModel } from "../models/users.js";
import { comparePassword ,createPasswordHash} from "../../utils.js";
import ManagerDb from "./managerDb.js";
import bcrypt from 'bcrypt';

export default class Users extends ManagerDb{
    constructor(){
    super(usersModel)
    }


    findIfExist = async (emailUser) => {
        const resultAll = await this.model.findOne({email:emailUser}).lean();
      return resultAll
      }


      LoginValidate = async (emailUser,passUser) => {
        const user = await this.model.findOne({email:emailUser}).lean();
        const resultCompare = await comparePassword(passUser,user.password)
        if(resultCompare){
          return user 
        }else{
          return 0
        }      
      }


       save = async (user) => {
        try {
          const hashedPassword =  await createPasswordHash(user.password)
          const newUser = { ...user, password: hashedPassword };
          this.model.create(newUser)
        } catch (error) {
          throw new Error('Error al crear el usuario');
        }
      };


      findById = async (id) => {
        const user = await this.model.findById({_id:id}).lean();
        return user
    }

 
}