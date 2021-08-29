import { Document, Schema, model } from "mongoose";
import { hashSync } from 'bcrypt';

interface IUser extends Document {
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
    return Boolean(await User.findUser(login));
  }

  public static async findUser(login: string): Promise<IUser | null> {
    const filter = {
      login
    }

    return User.UserModel.findOne(filter);
  }

  public static async save(login: string, password: string): Promise<IUser> {

    const newUser = new User.UserModel({
      login,
      passwordHash: hashSync(password, 10)
    });

   return newUser.save();
  }
}