# Raven

Raven/[Sentry](https://www.getsentry.com) integration for Meteor. Includes [Raven.js](https://github.com/getsentry/raven-js) for frontend logging and [raven-node](https://github.com/getsentry/raven-node) for backend logging.

Provides consolidated error logging to Sentry via Raven from both the client and the server.

**Although this is a fork of `dVelopment/meteor-raven` and `deepwell/meteor-raven` the API is completely differently!**

## Usage
Grab your client keys (DSN) from your project settings in Sentry. I recommend saving them in Meteor's `setting.json`:
```js
  {
    // ...
    "sentryPrivateDSN": "https://public_key@app.getsentry.com/app_id",
    "public": {
      // ...
      // public key has to be available from the client!
      "sentryPublicDSN": "https://public_key:private_key@app.getsentry.com/app_id"
    }
  }
```

Now you can initialize the RavenLogger:
```js
import { Meteor } from 'meteor/meteor';
import RavenLogger from 'meteor/flowkey:raven';

// ...

export const ravenLogger = new RavenLogger({
  publicDSN: Meteor.settings.public.sentryPublicDSN, // will be used on the client
  privateDSN: Meteor.settings.sentryPrivateDSN, // will be used on the server
  shouldCatchConsoleError: true, // default
  trackUser: false, // default
}, ravenOptions);

// ...
```

You can pass options for raven directly into the client. Which parameters are accepted can be found at the Sentry docs for [the Node client](https://docs.sentry.io/clients/node/config/#optional-settings) and the [JavaScript client](https://docs.sentry.io/clients/javascript/config/#optional-settings). The options are being passed into both clients.

If you don't want to catch errors thrown globally or using `console.error` set `shouldCatchConsoleError` to `false`.

If you are using the Meteor Accounts package, you can enable user tracking on errors by settings `trackUser` to `true`. It will associate the error with the user's userId.


Now you can finally log messages to Sentry!
```js
import { ravenLogger } from './path/to/logger';

// ...

ravenLogger.log('Error transmitted using Raven.captureMessage', additionalData);
ravenLogger.log(new Error('Error transmitted using Raven.captureException'), additionalData);
```

If the first argument is an `instanceof Error` then `captureException` from Raven is used, otherwise `captureMessage`. If an error is passed, Raven will be saving full error and exception stack traces.

`additionalData` can be anything described in the [Sentry docs](https://docs.sentry.io/clients/javascript/usage/#passing-additional-data).


To set tags on the whole context, use `ravenLogger.setTagsContext`:

```js
ravenLogger.setTagsContext({ component: 'system' });
```

## License
This package is licensed under the [MIT License](https://github.com/flowkey/meteor-raven/blob/master/LICENSE). All rights to Raven are with the original authors.
