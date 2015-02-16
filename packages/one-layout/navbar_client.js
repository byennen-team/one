// TODO: make this helper global
Template.navbar.helpers({
  activeForRoute: function (routeName) {
    return Routes.getName() === routeName ? 'active' : '';
  }
});


Template.navbar.events({

	// closes the Communication Hub
	'click #navbar-logo': function () {
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "width", "0");
		$.Velocity.hook($('#communication-message-board'), "width", "0");
		$.Velocity.hook($('#communication-task-board'), "width", "0");
		$.Velocity.hook($('#communication-library-board'), "width", "0");
    // un-lock scroll position
    var body = $('body');
    if( body.data('scroll-position') ){
      var scrollPosition = body.data('scroll-position');
      body.css('overflow', body.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }
	},

  'click #navbar-link-task': function () {
    // expands the main dialog box t0 60% of full screen - task bar open
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );
    $.Velocity.hook($('#communication-main'), "width", "75%");
    $.Velocity.hook($('#communication-message-board'), "width", "56%");
    $.Velocity.hook($('#communication-task-board'), "width", "22%");
    $.Velocity.hook($('#communication-library-board'), "width", "22%");
    // add class to main chat window
    $('#communication-main').addClass('tasks');
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
