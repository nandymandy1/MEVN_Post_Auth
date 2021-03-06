import _ from "lodash";
import Router from "express";
import { User } from "../models";
import { userAuth, signToken } from "../Functions/auth";
import { check, validationResult } from "express-validator";

const router = Router();

/**
 * @TYPE POST
 * @DESC To Register a new user
 * @ACCESS Public
 * @END_PT /api/users/register
 */
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must contain atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const newUser = await User.create(req.body);
      tokenResp(newUser, res);
    } catch (err) {
      return res.status(403).json({
        message: err.message,
        success: false,
      });
    }
  }
);

/**
 * @TYPE GET
 * @DESC To Get the user's profile using the auth token
 * @ACCESS Private
 * @END_PT /api/users/auth
 */
router.get("/auth", userAuth, async (req, res) => {
  let authUser = _.pick(req.user, ["id", "email", "username", "userkey"]);
  return res.status(200).json(authUser);
});

/**
 * @TYPE POST
 * @DESC To Login a User via username and password
 * @ACCESS Public
 * @END_PT /api/users/auth
 */
router.post(
  "/auth",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must contain atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      // Find the user from the database using the username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({
          message: "Username not found",
          success: false,
        });
      }

      // Compare the password using the User Prototype Schema Method
      if (!(await user.isMatch(password, user.password))) {
        return res.status(403).json({
          message: "Incorrect password",
          success: false,
        });
      }

      tokenResp(user, res);
    } catch (err) {
      return res.status(401).json({
        message: err.message,
        success: false,
      });
    }
  }
);

router.post(
  "/password-reset",
  userAuth,
  [
    check("password", "Password must contain atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const { password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      await User.findByIdAndUpdate(req.user.id, { password });
      return res.status(201).json({
        message: "Password Changed Successfully.",
        success: true,
      });
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        message: "Unable to update the password please retry.",
        success: false,
      });
    }
  }
);

const tokenResp = async (user, res) => {
  const payload = _.pick(user, ["id", "email", "username", "userKey"]);
  // To generate a token ,sign it first
  let token = await signToken(payload);
  return res.status(200).json({
    token,
    success: true,
  });
};

export default router;
