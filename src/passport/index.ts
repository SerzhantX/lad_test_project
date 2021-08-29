import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from '../mongoModels';
import { compareSync } from 'bcrypt';

const jwtSecret: string = global.process.env.JWT_SECRET ?? '';

passport.use(new LocalStrategy({ usernameField: "login" }, async (username, password, done) => {

  let user;

  try {
    user = await User.findUser(username);
  } catch (err) {
    return done(err);
  }

  if (!user) {
    return done(null, false);
  }

  if (!compareSync(password, user.passwordHash)) {
    return done(null, false);
  }

  return done(null, user);
}));

const JwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}


passport.use(new JwtStrategy(JwtStrategyOptions, async (jwtToken, done) => {

  let user;

  try {
    user = await User.findUser(jwtToken.login);
  } catch (err) {
    return done(err);
  }

  if (!user) {
    return done(null, false);
  }

  return done(null, user);
}));