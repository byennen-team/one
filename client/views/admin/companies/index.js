Meteor.subscribe('companies');

Template.AdminCompanies.company = function(){
  return Companies.find();
}
