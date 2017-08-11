import Raven from 'raven';
import RavenLoggerBase from './main';

export default class RavenLoggerServer extends RavenLoggerBase {
  constructor({ privateDSN, shouldCatchConsoleError }, ravenOptions) {
    super({ shouldCatchConsoleError });

    Raven.config(privateDSN, { ...ravenOptions, environment: 'server' }).install();
    this.raven = Raven;
    this.trackUser = false;
  }

  setTagsContext(tags) { this.raven.setContext({ tags }); }
}
