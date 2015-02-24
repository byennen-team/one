// TODO: animate notice slide down (what will call them?)
Template.notificationsPopup.rendered = function () {
  // Initialize scrollbar 
  $( "#notifications-popup-sleeve" ).mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "inside"
  });
};

Template.notificationsPopup.helpers({
  // TODO: Should only return true if there are notifications
  'haveNotifications': function () {
    return Notify.getUnreadNotifications().count() ? true : false;
  },
  notificationsUnread: function () {
    return Notify.getUnreadNotifications();
  },
  date: function (dateToFormat) {
    return moment(dateToFormat).calendar();
  }
});

Template.notificationsPopup.events({
  // Hides .notice when .x is clicked & updates database
  'click .x': function (event) {
    var $this = $(event.target);
    $this.closest( '.notice' ).velocity("slideUp", { duration: 500 });
    Notify.markNotificationAsRead($(event.currentTarget).data("id"));
  }
});

