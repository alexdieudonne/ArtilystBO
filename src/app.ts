import express, { Request, Response, NextFunction } from 'express';
import payload from 'payload';
import bodyParser from 'body-parser';
//import cors from 'cors';
import { corsUrl, environment } from './config';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import Logger from './core/Logger';
import MethodOverride from 'method-override'
var methodOverride = require('method-override')

// import 'express-async-errors';
require('dotenv').config();


const app = express();

app.get('/', (_, res, next) => {
  res.redirect('/admin');
});


payload.errorHandler = async (err, req, res, next) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (environment === 'development') {
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
}

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || '',
  mongoURL: process.env.MONGODB_URI || '',
  express: app,
  onInit: async (payload) => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    payload.express.use(methodOverride('X-HTTP-Method-Override'));
  },
})




app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

// Routes
// app.use('/api', routes);

// Redirect root to Admin panel










// catch 404 and forward to error handler


export default app;
