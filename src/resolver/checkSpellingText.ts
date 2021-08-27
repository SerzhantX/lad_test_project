import axios from 'axios';
import qs from 'qs';

export class Spelling {

  private readonly url: string = global.process.env.SPELL_CHECK ?? '';
  private readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  private makeData(): string {

    return qs.stringify({
      text: this.text,
    });
  }

  public async spellCheck(): Promise<string> {

    const result = await axios.post(this.url, this.makeData());

    let text: string = this.text;

    for (let rep of result.data) {
      text = text.replace(rep.word, rep.s[0]);
    }

    return text;
  }
}