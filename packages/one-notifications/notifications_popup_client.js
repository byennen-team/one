// TODO: animate notice slide down (what will call them?)
Template.notificationsPopup.rendered = function () { 
  $( "#notifications-popup-sleeve" ).mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
};

Template.notificationsPopup.helpers({
  // TODO: Should only return true if there are notifications
  'haveNotifications': function () {
    return true;
  }
});

Template.notificationsPopup.events({
  // Hides .notice when .x is clicked
  // TODO: (maybe) might need to update database as well as hide
  'click .x': function (event) {
    var $this = $(event.target);
    $this.closest( '.notice' ).velocity("slideUp", { duration: 500 });
  }
});

