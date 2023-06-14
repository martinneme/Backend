import {
  Router
} from "express";
import Users from "../dao/dbManagers/users.js";
import __dirname, {
  generateToken
} from "../utils.js";

const sessionsRouter = Router();

const usersManager = new Users();

sessionsRouter.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const exist = await usersManager.findIfExist(email)

    if (exist) return res.status(400).send({
      status: "Error",
      error: "User already exist",
    });

    const user = {
      firstName,
      lastName,
      email,
      password
    };

    await usersManager.save(user)
    const accessToken = generateToken(user);
    res.cookie(
      'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
  ).send({ status: 'success' });
  } catch (error) {
    console.log(error)
  }
});

sessionsRouter.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await usersManager.LoginValidate(email, password);
    if (!user)
      return res.status(400).send({
        status: "Error",
        autorizated: false
      });


    const accessToken = generateToken(user);

    res.cookie(
      'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
  ).send({ status: 'success' });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      error: error.message
    });
  }
});

sessionsRouter.get("/logout", async (req, res) => {
   res.clearCookie('coderCookieToken').send({status:'Success'});
});

export default sessionsRouter;