Template.apps.events({
  'click .close-feature-app': function (event, template) {
    $('#featured-apps').velocity({ height: 0 }, "easeInSine");
    $('.featured-app-image, .close-feature-app').hide();
  }
});
