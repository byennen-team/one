Template.company_apps.events({
  'click .close-feature-app': function (event, template) {
    $('#featured-apps').velocity({ height: 0 }, "easeInSine");
    $('.featured-app-image, .close-feature-app').hide();
  }
});

Template.company_apps.rendered = function () {
  $('.company-apps-button').addClass('company-apps-button-active');
};
