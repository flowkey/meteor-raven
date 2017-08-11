import Raven from 'raven-js';

export function initializeClient(publicDSN, options) {
  Raven.config(publicDSN, options).install();
  return Raven;
}
