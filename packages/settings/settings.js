/* global Settings: true */

// lets complain to server command line if you forgot --settings when running Meteor
if (Meteor.isServer) {  
  if (Object.keys(Meteor.settings).length === 0) {
    console.log("You forgot to run Meteor with --settings!");
    console.log("Try this: meteor --settings settings.development.json")
    console.log ("")
  }
}

Settings = {};

Settings.isDevelopment = Meteor.settings.public.ENVIRONMENT === 'development';

Settings.isStaging = Meteor.settings.public.ENVIRONMENT === 'staging';

Settings.isBeta = Meteor.settings.public.ENVIRONMENT === 'beta';

Settings.isProduction = Meteor.settings.public.ENVIRONMENT === 'production';
