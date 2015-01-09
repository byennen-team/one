Settings = {};
Meteor.settings = Meteor.settings || {}
Meteor.settings.public = Meteor.settings.public || {}
Settings.isDevelopment = Meteor.settings.public.ENVIRONMENT === 'development';

Settings.isStaging = Meteor.settings.public.ENVIRONMENT === 'staging';

Settings.isProduction = Meteor.settings.public.ENVIRONMENT === 'production';
