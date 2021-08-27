import { Request, Response } from 'express';

export class unknownRouter {

  public static async handler(req: Request, res: Response): Promise<any> {
    res.status(404).send();
  }
}