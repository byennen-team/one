/* globals Skycons: false, RoomsController: false, Rooms: false */
var temp = new ReactiveVar();

Template.dashboardBanner.created = function() {
  Tracker.autorun(function() {
    if(Meteor.user().teamMembers)
      Meteor.subscribe('userProfiles', Meteor.user().teamMembers);
  });
};

Template.dashboardBanner.rendered = function () {
    // Scroll animation
  var $search = $( '#dashboard-mobile-search' );
  // add padding to following div to prevent jump.
  var $padding = $( '#dashboard-mobile-search-padding' );
  var offset = 90; 
  var lastScrollTop = 0;
  $( '#transitioner-1' ).on( 'scroll', function() {       
    // check for scroll direction
    var scrollPosition = $( '#transitioner-1' ).scrollTop();
    // once past offset, make search sticky
    if ( scrollPosition > offset ) { 
      if ( scrollPosition < lastScrollTop ){ // if scrolling up
        $search.removeClass( 'closed' ).addClass( 'open' );
      } else {
        $search.removeClass( 'open' ).addClass( 'closed' );
      }
      $search.addClass( 'sticky' );  
      $padding.addClass( 'fat' );  
    }else {
      $search.removeClass( 'sticky' );  
      $padding.removeClass( 'fat' );  
    }
    lastScrollTop = scrollPosition; // reset lastScrollTop

  }); 
  //geting geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //requesting position from Forecast
      Meteor.call('getForecast', position, function(e,r) {
        if (e)
          console.log(e);

        temp.set({
          temperature: Math.round(r.temperature),
          locality: r.locality
        });

        // Skycons:
        // Documentation here: http://darkskyapp.github.io/skycons/
        //var Skycons;
        var skycons = new Skycons({
          "color": "white",
          "resizeClear": true  // Android hack
        });

        skycons.add("skycon", r.icon);
        // start animation
        skycons.play();
      });
    }, function(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("You have to allow access to your location in " +
            "order to see the local weather");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Could not determine position");
          break;
        case error.TIMEOUT:
          console.log("Timeout in requestin position");
          break;
        case error.UNKNOWN_ERROR:
          console.log("Unknown error");
          break;
      }
    });
  }
};

Template.dashboardBanner.helpers({
// TODO: should return current temperature
  temp: function() {
    if (temp.get())
      return temp.get().temperature;
    else
      return null;
  },

// TODO: should return the closes city to User's current location
  city: function() {
    if (temp.get())
      return temp.get().locality;
    else
      return null;
  },
  month: function() {
    return moment().format('MMMM D');
  },
  time: function() {
    return moment().format('h:mm a');
  },
  status: function (status) {
    if (status) {
      switch (status.toUpperCase()) {
        case 'MOBILE':
          return 'mobile';
        case 'OUT OF OFFICE':
          return 'inactive';
        case 'IN THE OFFICE':
          return 'active';
      }
    } else {
      return "inactive";
    }
  }
  
});

Template.dashboardBanner.events({
  // Opens the com_hub when an avatar is clicked on
  'click .avatar-box': function(event) {
    var id = $(event.currentTarget).data("id");
    if (id) {
      RoomsController.createOrGetDMRoom(id, function(e,r) {
        if (! e) {
          Session.set('openRoomId',r);
          $( "#transitioner-1" ).animate( { scrollTop: 400 } );
          $.Velocity.hook($('#communication-main'), "width", "76%");
          $.Velocity.hook($('#communication-message-board'), "width", "78%");
          $.Velocity.hook($('#communication-task-board'), "width", "0");
          $.Velocity.hook($('#communication-library-board'), "width", "22%");
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
        }
      });
    }
  }

});
