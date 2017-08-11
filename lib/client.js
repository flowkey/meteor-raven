import Raven from 'raven-js';
import RavenLoggerBase from './main';

export default class RavenLoggerClient extends RavenLoggerBase {
  constructor({ publicDSN, shouldCatchConsoleError, trackUser }, ravenOptions) {
    super({ shouldCatchConsoleError });

    Raven.config(publicDSN, { ...ravenOptions, environment: 'client' }).install();
    this.raven = Raven;
    this.trackUser = trackUser;
  }

  setTagsContext(tags) { this.raven.setTagsContext(tags); }
}