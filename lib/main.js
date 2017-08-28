import { Meteor } from 'meteor/meteor';

export default class RavenLoggerBase {
  constructor({ shouldCatchConsoleError = true }) {
    if (shouldCatchConsoleError) {
      const originalConsoleError = console.error; // eslint-disable-line no-console
      console.error = (err, ...info) => { // eslint-disable-line no-console
        originalConsoleError(err, ...info);
        this.log(err, ...info);
      };
    }
  }

  log(message, options) {
    if (!this.raven) throw new Error('RavenLogger is not configured');
    if (this.trackUser) setUser(Meteor.userId(), this.raven);

    if (message instanceof Error) {
      this.raven.captureException(message, options);
    } else {
      this.raven.captureMessage(message, options);
    }
  }
}

// function defined outside to not expose it
function setUser(userId, raven) {
  if (!userId) {
    raven.setUser(); // removes user data if present
    return;
  }

  raven.setUser({ id: userId });
}
