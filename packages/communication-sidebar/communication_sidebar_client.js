Template.communicationSidebar.helpers({

	// Presentation logic
	communicationFilter: function(){
		var filter = Session.get('filter').filter;
		if( filter === 'all' ){
			return {
				all: true,
				company: false,
				direct: false,
				rooms: false 
			}
		}else if( filter === 'company' ){
			return {
				all: false,
				company: true,
				direct: false,
				rooms: false 
			}
		}else if( filter === 'direct' ){
			return {
				all: false,
				company: false,
				direct: true,
				rooms: false 
			}
		}else if( filter === 'rooms' ){
			return {
				all: false,
				company: false,
				direct: false,
				rooms: true 
			}
		}
	}

});

Template.communicationSidebar.events({

	// Scroll to top when communication sidebar is clicked, to appear full screen
	'click #communication-sidebar': function(){
		$('#sidebar-scroll-target').velocity("scroll",600);
		$('#main-wrap').addClass('blurry');
		$.Velocity.hook($('#communication-main'), "width", "100%");
	},

	'click .channel': function(){
		// expands the main dialog box to 80%
		$.Velocity.hook($('#communication-message-board'), "width", "80%");
		$.Velocity.hook($('#communication-task-board'), "width", "0%"); 
		$.Velocity.hook($('#communication-library-board'), "width", "20%");
	},

	'click .room': function(){
		// expands the main dialog box t0 60%
		$.Velocity.hook($('#communication-message-board'), "width", "60%");
		$.Velocity.hook($('#communication-task-board'), "width", "20%"); 
		$.Velocity.hook($('#communication-library-board'), "width", "20%"); 
	}


});










