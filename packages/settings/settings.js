Settings = {};

Settings.isDevelopment = function () {
  return Meteor.settings.public.ENVIRONMENT === 'development';
};

Settings.isProduction = function () {
  return Meteor.settings.public.ENVIRONMENT === 'production';
};