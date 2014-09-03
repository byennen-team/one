Meteor.subscribe('companies');

Template.AdminCompanies.company = function(){
  return Companies.find();
}

Template.AdminCompanies.events({
  'submit form' : function(event, template) {
    event.preventDefault();
    var companyName = template.find('#company-name').value;
    Companies.insert({name: companyName});
    console.log('Company added: ' + companyName);
  }
});
