import { Request, Response } from "express";
import { responses } from '../response';
import passport from "passport";
import * as jwt from "jsonwebtoken";

const jwtSecret: string = global.process.env.JWT_SECRET ?? '';

export class loginRouter {

  public static async handler (req: Request, res: Response): Promise<any> {

    try {
      loginRouter.validateReq(req)
    } catch (err) {
      if (err instanceof validateError) {
        switch (err.message) {
          case "invalidLogin":
            res.json(responses.invalidLogin());
            return;
          case "invalidPassword":
            res.json(responses.invalidPassword());
            return;
        }

        console.error('err', err);
        res.json(responses.notSuccess());
        return;
      }
    }

    passport.authenticate('local', function (err, user) {
      if (err) {
        console.error('err', err);
        res.json(responses.notSuccess());
        return;
      }

      if (!user) {
        res.json(responses.notExistUser());
        return;
      }

      const token = jwt.sign({ login: user.login }, jwtSecret);

      res.json(responses.success({ jwtToken: token }));
    })(req, res);
  }

  private static validateReq(req: Request): boolean {
    const { login, password } = req.body;
    const validatedLogin = loginRouter.validateLogin(login);
    const validatedPassword = loginRouter.validatePassword(password);

    return validatedLogin && validatedPassword;
  }

  private static validateLogin(login: any): boolean {
    if (typeof login !== 'string' || !login.length) {
      throw new validateError('invalidLogin');
    }

    return true;
  }

  private static validatePassword(password: any): boolean {
    if (typeof password !== 'string' || !password.length) {
      throw new validateError('invalidPassword');
    }

    return true;
  }
}

class validateError extends Error {}