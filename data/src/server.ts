// src/server.ts
import { Config } from './config/config';
import { name as packageName } from '../package.json';
import { app } from './app';

app.listen(Config.port, () => {
  console.log(`${packageName} node environment is ${Config.environment}`);
  console.log(`${packageName} listening at http://localhost:${Config.port}`);
  console.log(`${packageName} swagger UI URL is at http://localhost:${Config.port}/${Config.swaggerPath}`);
});
