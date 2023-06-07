import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 



export const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Error al comparar las contraseñas');
    }
  };
  

  export const createPasswordHash = (password) => {
    return bcrypt.hash(password, bcrypt.genSaltSync(10));
  }


        export default __dirname;