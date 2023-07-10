

export default class SessionsRepository {
    constructor(Sessions) {
        this.sessions = Sessions;
    }

     findUserExist = async (emailUser) =>{
        return await  this.sessions.findIfExist(emailUser);
    }
    
     validateLogin = async (emailUser,passUser) =>{
        return await  this.sessions.LoginValidate(emailUser,passUser);
    }
    
     saveUser = async (user)=> {
        return await  this.sessions.save(user);
    }
    
     findUserByID = async (id) =>{
        return await  this.sessions.findById(id);
    }
}