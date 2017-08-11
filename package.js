Package.describe({
  summary: 'Integrate with Raven JS for JavaScript errors and logs',
  version: '0.4.0',
  name: 'flowkey:raven',
  git: 'https://github.com/flowkey/meteor-raven.git',
  description: 'README.md'
});

Npm.depends({
  'raven': '2.1.1',
  'raven-js': '3.17.0',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.4.2.3');
  api.use('ecmascript');
  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');
});
