// src/server.ts
import { Config } from './config/config';
import { Container } from 'inversify';
import { Logger } from './util/logger';
import { name as packageName } from '../package.json';
import { app } from './app';

// Resolve an instance via IOC mechanism
const container = new Container();
const logger = container.resolve<Logger>(Logger);

app.listen(Config.port, () => {
  logger.log('info', `${packageName} node environment is ${Config.environment}`);
  logger.log('info', `${packageName} listening at http://localhost:${Config.port}`);
  logger.log('info', `${packageName} swagger UI URL is at http://localhost:${Config.port}/${Config.swaggerPath}`);
});
