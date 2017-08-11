import Raven from 'raven';

export function initializeServer(privateDSN, options) {
  Raven.config(privateDSN, options).install();
  return Raven;
}
