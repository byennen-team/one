Template.dashboardBanner.rendered = function () {
  $("#dashboard-schedule-sleeve").mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "outside"
  });

  // Skycons:
  // Documentation here: http://darkskyapp.github.io/skycons/
  var Skycons;
  var skycons = new Skycons({
    "color": "white",
    "resizeClear": true  // Android hack
  });

// TODO: need to plug in weather here. Examples:
  // skycons.add("skycon", Skycons.PARTLY_CLOUDY_DAY);
  // skycons.add("skycon", Skycons.CLOUDY);
  // skycons.add("skycon", Skycons.CLEAR_DAY);
  // more options in /dashboard_skycons_client.js
  skycons.add("skycon", Skycons.SNOW);
  // start animation
  skycons.play();
};

Template.dashboardBanner.helpers({
// TODO: should return current temperature
  temp: function() {
    return '34';
  },

// TODO: should return the closes city to User's current location  
  city: function() {
    return 'new york';
  },
  month: function() {
    return moment().format('MMMM D');
  },
  time: function() {
    return moment().format('h:mm a');
  }
});

Template.dashboardBanner.events({
  // Opens the com_hub when an avatar is clicked on
  'click .avatar-box': function() {
// TODO: need to open a direct message conversation with the Agent clicked on
    // expands the main dialog box t0 60% of full screen - task bar open
    $('#sidebar-scroll-target').velocity("scroll",600);
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "60%");
    $.Velocity.hook($('#communication-task-board'), "width", "0");
    $.Velocity.hook($('#communication-library-board'), "width", "15.5%");
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    $('.communication-sidebar-sleeve').css({
      'height': currentHeight - 130 + 'px',
      'position': 'fixed',
      'top': '120px',
      'width': '24%'
    });
    // lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  },

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
