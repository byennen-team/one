Template.adminCompaniesNew.events({
  'submit form': function (event, template) {
    event.preventDefault();
    companyName = template.$('#company-name').val();
    address_1 = template.$('#address_1').val();
    address_2 = template.$('#address_2').val();
    city = template.$('#city').val();
    state = template.$('#state').val();
    zip = template.$('#zip').val();
    phone = template.$('#phone').val();
    email = template.$('#email').val();
    website = template.$('#website').val();
    Companies.insert({
      name: companyName,
      address_1: address_1,
      address_2: address_2,
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
