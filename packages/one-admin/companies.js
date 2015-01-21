// TODO this should go in a controller
Meteor.subscribe('companies');

Template.adminCompanies.companies = function () {
  return Companies.find();
};

Template.adminCompanies.events({
  'click #AddCompany': function () {
    Router.go(Routes.Admin.COMPANIES_NEW);
  }
});
