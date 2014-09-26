Meteor.subscribe('companies');

Template.AdminCompanies.company = function(){
  return Companies.find();
}

Template.AdminCompanies.events({
  'click #AddCompany' : function(event, template) {
    Router.go('AdminCompaniesNew');
  }
});
