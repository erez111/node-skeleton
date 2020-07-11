// src/app.ts
import express, { Response as ExResponse, Request as ExRequest, NextFunction as ExNextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { ValidateError } from 'tsoa';
import { Config } from './config/config';
import { RegisterRoutes } from '../build/routes';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use(`/${Config.swaggerPath}`, swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => res.send(
  swaggerUi.generateHTML(await import('../build/swagger.json')),
));

RegisterRoutes(app);

// Handling missing routes
app.use((_req, res: ExResponse) => {
  res.status(404).send({
    message: 'Not Found',
  });
});

// Handling Validation Errors
app.use((
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: ExNextFunction,
  // eslint-disable-next-line consistent-return
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.warn(`Caught Internal Server Error for ${req.path}:`, err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});
