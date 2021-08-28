import { Request, Response } from 'express';
import { responses } from '../response';
import { Spelling } from '../resolver/checkSpellingText'

export class spellingRouter {

  public static async handler (req: Request, res: Response): Promise<any> {

    if (!spellingRouter.validateReq(req)) {
      res.json(responses.notExistText());
      return;
    }

    const text: string = req.body.text.trim();

    let spelling = new Spelling(text);

    let data;

    try {
      data = await spelling.spellCheck();
    } catch (err) {
      console.error('err', err);
      res.json(responses.notSuccess());
      return;
    }

    res.json(responses.success(data));
  }

  private static validateReq(req: Request): boolean {
    const text = req.body.text;
    return spellingRouter.validateText(text);
  }

  private static validateText(text: any): boolean {
    return text !== undefined && typeof text === 'string';
  }
}