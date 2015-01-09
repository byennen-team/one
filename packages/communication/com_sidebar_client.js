Template.comSidebar.helpers({

	// Presentation logic
	comFilter: function(){
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

Template.comSidebar.events({

	// Scroll to top when communication sidebar is clicked, to appear full screen
	'click #com-sidebar': function(){
		$('#sidebar-scroll-target').velocity("scroll",600);
	},

});