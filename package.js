Package.describe({
  summary: 'Integrate with Raven JS for JavaScript errors and logs',
  version: '1.1.0',
  name: 'flowkey:raven',
  git: 'https://github.com/flowkey/meteor-raven.git',
  description: 'README.md'
});

Npm.depends({
  'raven': '2.4.1',
  'raven-js': '3.22.3',
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.4.2.3');
  api.use('ecmascript');
  api.mainModule('lib/client.js', 'client');
  api.mainModule('lib/server.js', 'server');
});
