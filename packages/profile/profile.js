Template.profile.events({
  'submit form' : function(event, template) {
    event.preventDefault();

    name = template.find("input[name=name]");
    phone = template.find("input[name=phone]");
    console.log('click');

    // Do form validation

    var data = {
      name: name.value,
      phone: phone.value,
    };

    name.value="";
    phone.value="";

  Profile.insert(data);

}});