Template.adminCompaniesNew.events({
  'submit form': function (event, template) {
    event.preventDefault();
    var companyName = template.$('#company-name').val();
    var address1 = template.$('#address1').val();
    var address2 = template.$('#address2').val();
    var city = template.$('#city').val();
    var state = template.$('#state').val();
    var zip = template.$('#zip').val();
    var phone = template.$('#phone').val();
    var email = template.$('#email').val();
    var website = template.$('#website').val();
    Companies.insert({
      name: companyName,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      website: website
    });
    Router.go('AdminCompanies');
    console.log('Company added: ' + companyName);
  }
});
