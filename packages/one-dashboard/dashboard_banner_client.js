/* globals Skycons: false, RoomsController: false, Rooms: false */
var temp = new ReactiveVar();

Template.dashboardBanner.created = function() {
  Tracker.autorun(function() {
    if(Meteor.user().teamMembers)
      Meteor.subscribe('userProfiles', Meteor.user().teamMembers);
  });
};

Template.dashboardBanner.rendered = function () {
  $("#dashboard-schedule-sleeve").mCustomScrollbar({
      theme:"one-dark",
      scrollbarPosition: "outside"
  });
  function positionSuccess(position) {
      if (_.isEmpty(position)) {
        console.log('Position Object is Empty!');
        return;
      }

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
    }

    function positionError(error) {
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
    }
  //geting geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError,
      {maximumAge:Infinity, timeout:0});
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
  teamMembers: function() {
    if(Meteor.user() && Meteor.user().teamMembers)
      return Meteor.users.find({
        _id: {
          $in: Meteor.user().teamMembers
        }
      });
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
  },
  unreadMessages: function() {
    //getting dm room if it exists
    var dm = Rooms.findOne({
      roomType: 'dm',
      $and: [
      { 'participants.participantId': this._id },
      { 'participants.participantId': Meteor.userId() }
      ]
    });

    if(dm)
      return RoomsController.getUnreadMessagesCount(dm._id);
    else
      return false;
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
