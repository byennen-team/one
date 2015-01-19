Template.notifications.rendered = function () {
  Meteor.subscribe('notifications',5)
  Session.set( 'dropdown', false );
  Session.set( 'statusPanel', true );
}

Template.notifications.helpers({
  profile: function() {
    if ( Meteor.user() )
      return Meteor.user().profile
  },
  status: function (status) {
    switch (status.toUpperCase()) {
      case 'MOBILE':
        return 'mobile';
        break;
      case 'OUT OF OFFICE':
        return 'inactive';
        break;
      case 'IN THE OFFICE':
        return 'active';
        break;
      }
  },
  notificationsUnread: function () {
    return Notify.getUnreadNotifications();
  },
  hasNotifications: function () {
    return Notify.getUnreadNotifications().count() ? 'has-notifications' : '';
  },
  notifications: function () {
    return Notify.getUnreadNotifications();
  },
  date: function (dateToFormat) {
    return moment(dateToFormat).calendar()
  },
  isActive: function (text,status) {
    return text.toUpperCase() === status.toUpperCase() ? 'active': '';
  }
})

Template.notifications.events({

  // Toggle the dropdown when the avatar is clicked
  'click #notifications-avatar': function () {
     var open = Session.get( 'dropdown' );
    if( open ){
  console.log('open - flash')
      $( '#notification-dropdown' ).velocity("slideUp", { duration: 300 });
      Session.set( 'dropdown', false );
    } else {
  console.log('close - flash')
      $( '#notification-dropdown' ).velocity("slideDown", { duration: 500, easing: "ease-out" });
      Session.set( 'dropdown', true );
    }
  },

  // Show notifications and hide status options (on the dropdown)
  'click #notification-activate.has-notifications, click #notification-alert.has-notifications': function () {
      Session.set( 'statusPanel', false );
  },

  // Show status options and hide notifications (on the dropdown)
  'click #notification-deactivate': function () {
    Session.set( 'statusPanel', true );
    Notify.markAllNotificationsAsRead();
  },
  'click .notification-object.status-changer': function(e) {
    var status = e.target.innerText;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {'profile.status': status }});
  }

});

Tracker.autorun(function () {
  // Show the status panel if Session "statusPanel" is true
  // otherwise show the notifications
  var statusPanel = Session.get( 'statusPanel' );
  if( statusPanel ){
    console.log('true')
    // $( '#status-panel' ).velocity({ opacity: 1 }, { display: "block" });
    // $( '#notification-panel' ).velocity({ opacity: 0 }, { display: "none" });
    $( '#status-panel' ).velocity("slideDown", { duration: 500, easing: "ease-out", delay: 450 });
    $( '#notification-panel' ).velocity("slideUp", { duration: 500 });
  } else {
    console.log('false')
    // $( '#notification-panel' ).velocity({ opacity: 1 }, { display: "block" });
    // $( '#status-panel' ).velocity({ opacity: 0 }, { display: "none" });
    $( '#notification-panel' ).velocity("slideDown", { duration: 500, easing: "ease-out", delay: 450 });
    $( '#status-panel' ).velocity("slideUp", { duration: 500 });
  }
});