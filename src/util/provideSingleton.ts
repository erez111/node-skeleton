// src/util/provideSingleton.ts
import { fluentProvide } from 'inversify-binding-decorators';
import 'reflect-metadata';
import { interfaces } from 'inversify';

export const provideSingleton = function <T> (
  identifier: interfaces.ServiceIdentifier<T>,
) {
  return fluentProvide(identifier).inSingletonScope().done();
};
