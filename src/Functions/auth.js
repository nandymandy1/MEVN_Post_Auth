import _ from "lodash";
import jwt from "jsonwebtoken";
import passport from "passport";
import { APP_SECRET } from "../config";

export const signToken = async (payload) => {
  let secret = APP_SECRET;
  let token = jwt.sign(payload, secret, { expiresIn: "2 days" });
  return `Bearer ${token}`;
};

export const userAuth = passport.authenticate("jwt", { session: false });

export const serializeUser = (user) =>
  _.pick(user, ["email", "username", "name"]);
