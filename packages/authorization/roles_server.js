// On server startup, if the database is empty, create some initial data.
// TODO: add roles on startup
if (Meteor.roles.find().count() === 0) {
    Roles.createRole('admin');
}