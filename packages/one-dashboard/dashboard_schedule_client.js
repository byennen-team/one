Template.dashboardSchedule.rendered = function() {
  $("#dashboard-schedule-sleeve").mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "outside"
  });
};  

Template.dashboardSchedule.events({

  'click .event': function (event) { // these events are different
    var $this = $( event.target );
    var $description = $this.siblings( '.description-box' );
    $description.velocity("fadeIn", { duration: 500 });
  },

  'mouseenter .time': function (event) {
    var $time = $( event.target );
    $time.velocity( "stop", true ); // clear queue - no dancing!
    $time.velocity({
      scaleX: 1.3,
      scaleY: 1.3
    });
  },

  'mouseleave .time': function (event) {
    var $time = $( event.target );
    $time.velocity({
      scaleX: 1.0,
      scaleY: 1.0
    });
  },

  'mouseleave .event': function (event) {
    var $this = $( event.target );
    var $description = $this.find( '.description-box' );
    $description.velocity("fadeOut", { duration: 300 });
  },

// TODO: Should populate the event menu with data for event
// TODO: #banner-add-event creates a new event.
  // Calls the event menu modal
  'click .description, click #banner-add-event': function () {
    $( '#event-menu, #event-menu-clear' ).velocity("fadeIn", { duration: 500 });
  }

});