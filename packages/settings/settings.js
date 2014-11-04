Settings = {};

Settings.isDevelopment = Meteor.settings.public.ENVIRONMENT === 'development';

Settings.isStaging = Meteor.settings.public.ENVIRONMENT === 'staging';

Settings.isProduction = Meteor.settings.public.ENVIRONMENT === 'production';
