import Users from '../dao/dbManagers/users.js';

export default class SessionsRepository {
    constructor() {
        this.dao = new Users();
    }

     findUserExist = async (emailUser) =>{
        return await  this.dao.findIfExist(emailUser);
    }
    
     validateLogin = async (emailUser,passUser) =>{
        return await  this.dao.LoginValidate(emailUser,passUser);
    }
    
     saveUser = async (user)=> {
        return await  this.dao.save(user);
    }
    
     findUserByID = async (id) =>{
        return await  this.dao.findById(id);
    }
}