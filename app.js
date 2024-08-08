import createError from 'http-errors';
import express, { Router, json, urlencoded } from 'express';
import cors from 'cors';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// MARK: connect to the database (MongoDB)
import connectDB from "./articles/connection.js";

connectDB();

// MARK: Router

let apiRouter = Router();

import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import articlesRouter from './routes/articles.js';
import likesRouter from './routes/likes.js';

let app = express();

let corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// view engine setup
// app.set('views', join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(static(join(__dirname, 'public')));

apiRouter.use('/users', usersRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/likes", likesRouter);

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
