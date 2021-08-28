import { Request, Response } from 'express';
import { responses } from '../response';
import { User } from '../mongoModels'
import { passwordOptions } from "../setting/setting.json";

export class registerRouter {

  public static async handler (req: Request, res: Response): Promise<any> {

    try {
      await registerRouter.validateReq(req)
    } catch (err) {
      if (err instanceof validateError) {
        switch (err.message) {
          case "invalidLogin":
            res.json(responses.invalidLogin());
            return;
          case "invalidPassword":
            res.json(responses.invalidPassword());
            return;
          case "existLogin":
            res.json(responses.existLogin());
            return;
        }

        console.error('err', err);
        res.json(responses.notSuccess());
        return;
      }
    }

    const { login, password } = req.body;

    try {
      await User.save(login, password);
    } catch (err) {
      console.error('err', err);
      res.json(responses.notSuccess());
      return;
    }

    res.json(responses.success());
  }

  private static async validateReq(req: Request): Promise<boolean> {
    const { login, password } = req.body;
    const validatedLogin = await registerRouter.validateLogin(login);
    const validatedPassword = registerRouter.validatePassword(password);

    return validatedLogin && validatedPassword;
  }

  private static async validateLogin(login: any): Promise<boolean> {
    if (typeof login !== 'string' || !login.length) {
      throw new validateError('invalidLogin');
    }

    if (await User.checkLogin(login)) {
      throw new validateError('existLogin');
    }

    return true;
  }

  private static validatePassword(password: any): boolean {
    const min = passwordOptions.min;
    const max = passwordOptions.max;

    if (typeof password !== 'string' || password.length < min || password.length > max) {
      throw new validateError('invalidPassword');
    }

    return true;
  }
}

class validateError extends Error {}