import cors from "cors";
import bp from "body-parser";
import express from "express";
import consola from "consola";
import mongoose from "mongoose";
import passport from "passport";

// Config Import
import { APP_DB as DB, PORT as APP_PORT } from "./config";

// Routes Import
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";

const app = express();

require("./middleware/auth");

// Application Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    consola.success({
      badge: true,
      message: `Database connected successfully \n${DB}`,
    });
    app.listen(APP_PORT, () =>
      consola.success({
        badge: true,
        message: `Server started on port ${APP_PORT}`,
      })
    );
  } catch (err) {
    consola.error("APP_STARTING_ERROR", err);
    consola.error({
      badge: true,
      message: err.message,
    });
  }
};

startApp();
