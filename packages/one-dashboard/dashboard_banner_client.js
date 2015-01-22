Template.dashboardBanner.helpers({
// TODO: should return current temperature
  temp: function() {
    return '34';
  },
// TODO: should return icon code based on current weather
  weather: function() {
    return 'fa-sun-o';
    // example: (need to create custom icons)
    // if( sunny ){
    //   return 'fa-sun-o';
    // } else if ( cloudy ) {
    //   return 'fa-cloud';
    // } else if ( rain ) {
    //   return 'fa-tint';
    // } else if ( snow ) {
    //   return 'fa-bug';
    // }
  },
// TODO: should return the closes city to User's current location  
  city: function() {
    return 'new york';
  },
  month: function() {
    return moment().format('MMMM Do');
  },
  time: function() {
    return moment().format('h:mm a');
  }
});

Template.dashboardBanner.events({
  // Opens the com_hub when an avatar is clicked on
  'click .avatar-box': function(event) {
// TODO: need to open a direct message conversation with the Agent clicked on
    var $this = $( event.target );
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
    $description.velocity("fadeIn", { duration: 500 })
  },

  'mouseleave .event': function (event) {
    var $this = $( event.target );
    var $description = $this.find( '.description-box' );
    $description.velocity("fadeOut", { duration: 300 })
  }

});
