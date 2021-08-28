import { Schema, model } from "mongoose";
import { hash } from 'bcrypt';

interface IUser {
  login: string;
  passwordHash: string;
}

const schema = new Schema<IUser>({
  login: { type: String, unique: true },
  passwordHash: String
});

export class User {

  private static UserModel = model<IUser>('User', schema);

  public static async checkLogin(login: string): Promise<boolean> {

    const filter = {
      login
    }

    return Boolean(await User.UserModel.countDocuments(filter));
  }

  public static async save(login: string, password: string): Promise<IUser> {

    const newUser = new User.UserModel({
      login,
      passwordHash: await hash(password, 10)
    });

   return newUser.save();
  }

}