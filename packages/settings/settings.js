Settings = {};
Settings.isDevelopment = Meteor.settings.public.ENVIRONMENT === 'development';

Settings.isStaging = Meteor.settings.public.ENVIRONMENT === 'staging';

Settings.isBeta = Meteor.settings.public.ENVIRONMENT === 'beta';

Settings.isProduction = Meteor.settings.public.ENVIRONMENT === 'production';
