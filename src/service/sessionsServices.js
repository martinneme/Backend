import SessionsRepository from "../repositories/sessions.repository.js";

const sessionsRepository = new SessionsRepository();

const findUserExist = async (emailUser) =>{
    return await sessionsRepository.findUserExist(emailUser);
}

const validateLogin = async (emailUser,passUser) =>{
    return await sessionsRepository.validateLogin(emailUser,passUser);
}

const saveUser = async (user)=> {
    return await sessionsRepository.saveUser(user);
}

const findUserByID = async (id) =>{
    return await sessionsRepository.findUserByID(id);
}


export {
    findUserExist,
    validateLogin,
    saveUser,
    findUserByID

}