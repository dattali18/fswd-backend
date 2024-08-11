import createError from "http-errors";
import express, { Router, json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";

// MARK: connecting MongoDB
import connectDB from "./articles/connection.js";

connectDB();

// MARK: Routers
let apiRouter = Router();

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import articlesRouter from "./routes/articles.js";
import likesRouter from "./routes/likes.js";
import commentsRouter from "./routes/comments.js";

let app = express();

let corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// Middlewares
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// API routes
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/likes", likesRouter);

app.use("/api", apiRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "Resource not found"));
});

// Error handler
app.use((err, req, res, next) => {
  // Only provide error details in development
  const errorDetails = req.app.get("env") === "development" ? err : {};

  // Respond with JSON
  res.status(err.status || 500).json({
    message: err.message,
    error: errorDetails,
  });
});

export default app;
