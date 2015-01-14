// TODO: make this helper global
Template.navbar.helpers({
  activeForRoute: function (routeName) {
    return Routes.getName() === routeName ? 'active' : '';
  }
});


Template.navbar.events({

	// closes the Communication Hub
	'click #navbar-logo': function(){
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "width", "0");
		$.Velocity.hook($('#communication-message-board'), "width", "0");
		$.Velocity.hook($('#communication-task-board'), "width", "0"); 
		$.Velocity.hook($('#communication-library-board'), "width", "0");
		// force scrollbar on sidebar
		var currentHeight = $(window).height();
		$('.communication-sidebar-sleeve').css({
			'height': 'inherit',
			'position': 'static',
			'top': '130px',
			'width': '100%'
		});
    // un-lock scroll position
    var body = jQuery('body');
    var scrollPosition = body.data('scroll-position');
    body.css('overflow', body.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
	}

});
