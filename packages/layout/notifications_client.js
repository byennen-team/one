Template.notifications.rendered = function () {
  Session.set( 'dropdown', false );
  Session.set( 'statusPanel', true );
}

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
  'click #notification-activate, click #notification-alert': function () {
    Session.set( 'statusPanel', false );
  },

  // Show status options and hide notifications (on the dropdown)
  'click #notification-deactivate': function () {
    Session.set( 'statusPanel', true );
  },

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