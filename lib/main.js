import { Meteor } from 'meteor/meteor';

export default class RavenLogger {
  constructor(
    {
      publicDSN,
      privateDSN,
      trackUser = false,
      shouldCatchConsoleError = true,
    },
    ravenOptions,
  ) {
    if (Meteor.isClient && publicDSN) {
      import { initializeClient } from './client';

      this.raven = initializeClient(publicDSN, {
        ...ravenOptions,
        environment: 'client',
      });
    }

    if (Meteor.isServer && privateDSN) {
      import { initializeServer } from './server';

      this.raven = initializeServer(privateDSN, {
        ...ravenOptions,
        environment: 'server',
      });
    }

    if (Meteor.isClient && trackUser) {
      this.trackUser = trackUser;
    }

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

    // temp work-around because userId() is not set on load but reactive
    if (this.trackUser && Meteor.isClient && Meteor.userId) setUser(Meteor.userId(), this.raven);

    if (message instanceof Error) {
      this.raven.captureException(message, options);
    } else {
      this.raven.captureMessage(message, options);
    }
  }

  setTagsContext(tags) {
    if (Meteor.isClient) {
      this.raven.setTagsContext(tags);
    } else {
      this.raven.setContext({ tags });
    }
  }
}

// function defined outside to not expose it
function setUser(userId, raven) {
  if (Meteor.isServer) return;
  if (!userId) {
    raven.setUser(); // removes user data if present
    return;
  }

  raven.setUser({ id: userId });
}
