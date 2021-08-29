import { Request, Response, NextFunction } from "express";
import { responses } from '../response';
import passport from "passport";
import * as jwt from "jsonwebtoken";

export class authRouter {

  public static async handler (req: Request, res: Response, next: NextFunction): Promise<any> {

    passport.authenticate("jwt", function (err, user) {
      if (err) {
        console.error('err', err);
        res.json(responses.notAuth());
        return;
      }

      if (!user) {
        res.json(responses.notAuth());
        return;
      }

      req.user = user;

      return next();

    })(req, res, next);
  }
}